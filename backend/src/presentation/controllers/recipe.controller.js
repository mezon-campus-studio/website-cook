const { RecipeService } = require('../../business/services/recipe.service');
const { AIService } = require('../../business/services/ai.service');
const { RecipeRepository } = require('../../repository/recipe.repository');
const { IngredientRepository } = require('../../repository/ingredient.repository');
const { success, error: sendError } = require('../../utils/response');

class RecipeController {
  constructor() {
    // Manual dependency injection
    const recipeRepository = new RecipeRepository();
    const ingredientRepository = new IngredientRepository();
    const aiService = new AIService();

    this.recipeService = new RecipeService(
      recipeRepository,
      ingredientRepository,
      aiService
    );
  }

  /**
   * POST /recipes/suggest
   * Body: { "ingredients": ["Cá hồi", "Bơ", "Chanh vàng"] }
   */
  async suggest(req, res, next) {
    try {
      const { ingredients } = req.body;
      const recipes = await this.recipeService.suggest(ingredients);
      return success(res, recipes);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('RecipeController.suggest error:', err);

      if (err.message.includes('GEMINI_API_KEY')) {
        return sendError(res, err.message, 503);
      }

      return sendError(res, 'Failed to suggest recipes');
    }
  }
}

module.exports = { RecipeController };
