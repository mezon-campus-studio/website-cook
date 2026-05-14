const { env } = require('../../config/env');

/**
 * AI Service — wraps calls to the Gemini API for recipe generation.
 *
 * The AI returns structured recipe data that maps directly to the
 * existing database schema: recipes, recipe_ingredients, recipe_steps.
 */
class AIService {
  /**
   * Generate recipe suggestions from a list of ingredient names.
   *
   * @param {string[]} ingredientNames
   * @returns {Promise<Array<{
   *   name: string,
   *   description: string,
   *   cook_time: number,
   *   difficulty: string,
   *   ingredients: Array<{ name: string, quantity: string, unit: string }>,
   *   steps: Array<{ step_order: number, content: string, duration: number | null }>
   * }>>}
   */
  async generateRecipes(ingredientNames) {
    if (!env.GEMINI_API_KEY) {
      throw new Error(
        'GEMINI_API_KEY is not configured. Cannot generate AI recipes.'
      );
    }

    const prompt = this._buildPrompt(ingredientNames);
    const raw = await this._callGemini(prompt);
    return this._parseResponse(raw);
  }

  /**
   * Build the prompt sent to the AI model.
   * The response shape must match our database schema exactly.
   *
   * @param {string[]} ingredients
   * @returns {string}
   */
  _buildPrompt(ingredients) {
    return `
Bạn là một đầu bếp chuyên nghiệp người Việt.
Hãy gợi ý 3 công thức nấu ăn sử dụng các nguyên liệu sau: ${ingredients.join(', ')}.

Trả về dạng JSON (không có markdown, không có backtick):
[
  {
    "name": "Tên món ăn",
    "description": "Mô tả ngắn gọn về món ăn",
    "cook_time": 30,
    "difficulty": "easy",
    "ingredients": [
      { "name": "Nguyên liệu 1", "quantity": "200", "unit": "g" },
      { "name": "Nguyên liệu 2", "quantity": "1", "unit": "muỗng canh" }
    ],
    "steps": [
      { "step_order": 1, "content": "Sơ chế nguyên liệu...", "duration": 10 },
      { "step_order": 2, "content": "Nấu món ăn...", "duration": 20 }
    ]
  }
]

Yêu cầu:
- Trả về chính xác JSON array.
- Mỗi công thức phải có: name, description, cook_time (phút), difficulty (easy/medium/hard).
- Mỗi ingredient phải có: name, quantity, unit.
- Mỗi step phải có: step_order (số thứ tự), content, duration (phút, có thể null).
- Viết bằng tiếng Việt.
- Không thêm bất kỳ text nào ngoài JSON.
`.trim();
  }

  /**
   * Call the Gemini REST API.
   * @param {string} prompt
   * @returns {Promise<string>} Raw text response.
   */
  async _callGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096
        }
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${body}`);
    }

    const json = await response.json();
    const text =
      json?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return text;
  }

  /**
   * Parse the raw AI text into structured recipe objects.
   * @param {string} raw
   * @returns {Array}
   */
  _parseResponse(raw) {
    try {
      // Strip potential markdown code fences
      let cleaned = raw.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
      }
      const recipes = JSON.parse(cleaned);

      if (!Array.isArray(recipes)) {
        throw new Error('AI response is not an array');
      }

      return recipes.map((r) => ({
        name: r.name || 'Không tên',
        description: r.description || '',
        cook_time: typeof r.cook_time === 'number' ? r.cook_time : null,
        difficulty: ['easy', 'medium', 'hard'].includes(r.difficulty)
          ? r.difficulty
          : 'medium',
        ingredients: Array.isArray(r.ingredients)
          ? r.ingredients.map((i) => ({
              name: i.name || '',
              quantity: String(i.quantity || ''),
              unit: i.unit || ''
            }))
          : [],
        steps: Array.isArray(r.steps)
          ? r.steps.map((s, idx) => ({
              step_order: s.step_order || idx + 1,
              content: s.content || '',
              duration: typeof s.duration === 'number' ? s.duration : null
            }))
          : []
      }));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse AI response:', err.message);
      console.error('Raw response:', raw);
      throw new Error('Failed to parse AI-generated recipe data');
    }
  }
}

module.exports = { AIService };
