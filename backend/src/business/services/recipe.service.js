const { normalizeVietnamese } = require('../../utils/vietnamese');

/**
 * Recipe business service.
 *
 * Orchestrates:
 *   1. Search existing recipes by ingredient match (scored & ranked).
 *   2. Fall back to AI generation when no DB matches exist.
 *   3. Persist AI-generated recipes into existing tables.
 *
 * Uses ONLY existing tables: recipes, recipe_ingredients, recipe_steps, ingredients.
 */
class RecipeService {
  /**
   * @param {import('../../repository/recipe.repository').RecipeRepository} recipeRepository
   * @param {import('../../repository/ingredient.repository').IngredientRepository} ingredientRepository
   * @param {import('./ai.service').AIService} aiService
   */
  constructor(recipeRepository, ingredientRepository, aiService) {
    this.recipeRepository = recipeRepository;
    this.ingredientRepository = ingredientRepository;
    this.aiService = aiService;
  }

  /**
   * Main entry point — suggest recipes for the given ingredient names.
   *
   * @param {string[]} ingredientNames
   * @returns {Promise<Array>} Formatted recipe array with match_score.
   */
  async suggest(ingredientNames) {
    // ── STEP 1: Resolve ingredient IDs from names ──
    const ingredients = await this.ingredientRepository.findByNames(
      ingredientNames
    );

    const ingredientIds = ingredients.map((i) => i.id);
    const ingredientIdSet = new Set(ingredientIds);

    // Build name lookup: id → name
    const ingredientNameMap = new Map(ingredients.map((i) => [i.id, i.name]));

    // ── STEP 2-5: Search existing recipes & rank ──
    if (ingredientIds.length > 0) {
      const rawRecipes =
        await this.recipeRepository.findByIngredientIds(ingredientIds);

      if (rawRecipes.length > 0) {
        const formatted = this._formatAndScore(
          rawRecipes,
          ingredientIdSet,
          ingredientNames
        );
        return formatted;
      }
    }

    // ── STEP 6-7: No recipes found → AI fallback ──
    const aiRecipes = await this.aiService.generateRecipes(ingredientNames);

    // ── Save AI recipes into DB ──
    const saved = await this._saveAIRecipes(aiRecipes);

    return saved;
  }

  /**
   * Format DB recipes into the expected response shape and calculate scores.
   *
   * Scoring:
   *   +2 points — exact ingredient match (ingredient ID in selected set)
   *   +1 point  — partial name match (recipe name overlaps with a selected ingredient)
   *
   * @param {Array} recipes - Raw recipes from DB (with nested recipe_ingredients + recipe_steps).
   * @param {Set<number>} selectedIds - Set of selected ingredient IDs.
   * @param {string[]} selectedNames - Original ingredient names from the request.
   * @returns {Array}
   */
  _formatAndScore(recipes, selectedIds, selectedNames) {
    const normalizedSelected = selectedNames.map((n) => normalizeVietnamese(n));

    const scored = recipes.map((recipe) => {
      let matchScore = 0;

      // ── Score exact ingredient matches ──
      const recipeIngredientIds =
        recipe.recipe_ingredients?.map((ri) => ri.ingredients_id) || [];

      for (const rid of recipeIngredientIds) {
        if (selectedIds.has(rid)) {
          matchScore += 2; // exact match
        }
      }

      // ── Score partial name matches ──
      const normalizedRecipeName = normalizeVietnamese(recipe.name || '');
      for (const ns of normalizedSelected) {
        if (
          normalizedRecipeName.includes(ns) ||
          ns.includes(normalizedRecipeName)
        ) {
          matchScore += 1;
        }
      }

      // ── Format ingredients ──
      const formattedIngredients = (recipe.recipe_ingredients || []).map(
        (ri) => ({
          id: ri.ingredients_id,
          name: ri.ingredients?.name || `Ingredient #${ri.ingredients_id}`,
          quantity: ri.quantity || '',
          unit: ri.unit || ''
        })
      );

      // ── Format steps (sorted by step_order) ──
      const formattedSteps = (recipe.recipe_steps || [])
        .sort((a, b) => a.step_order - b.step_order)
        .map((s) => ({
          step_order: s.step_order,
          content: s.content
        }));

      return {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        image_url: recipe.image_url,
        cook_time: recipe.cook_time,
        difficulty: recipe.difficulty,
        ingredients: formattedIngredients,
        steps: formattedSteps,
        match_score: matchScore
      };
    });

    // Sort by match_score descending
    scored.sort((a, b) => b.match_score - a.match_score);

    return scored;
  }

  /**
   * Persist AI-generated recipes into the database.
   *
   * For each recipe:
   *   1. Find or create ingredient rows in `ingredients` table.
   *   2. Insert recipe row in `recipes` table.
   *   3. Insert links in `recipe_ingredients` table.
   *   4. Insert steps in `recipe_steps` table.
   *
   * @param {Array} aiRecipes - Parsed AI recipe objects.
   * @returns {Promise<Array>} Formatted recipe objects.
   */
  async _saveAIRecipes(aiRecipes) {
    const saved = [];

    for (const aiRecipe of aiRecipes) {
      // ── 1. Resolve / create ingredients ──
      const resolvedIngredients = [];
      for (const ing of aiRecipe.ingredients) {
        const slug = normalizeVietnamese(ing.name);
        const ingredient = await this.ingredientRepository.findOrCreate(
          ing.name,
          slug
        );
        resolvedIngredients.push({
          id: ingredient.id,
          name: ingredient.name,
          quantity: ing.quantity,
          unit: ing.unit
        });
      }

      // ── 2. Insert recipe ──
      const created = await this.recipeRepository.create({
        name: aiRecipe.name,
        description: aiRecipe.description,
        image_url: null,
        cook_time: aiRecipe.cook_time,
        difficulty: aiRecipe.difficulty
      });

      // ── 3. Link ingredients via recipe_ingredients ──
      const ingredientLinks = resolvedIngredients.map((ri) => ({
        ingredients_id: ri.id,
        quantity: ri.quantity,
        unit: ri.unit,
        is_require: true
      }));
      await this.recipeRepository.linkIngredients(created.id, ingredientLinks);

      // ── 4. Insert recipe_steps ──
      await this.recipeRepository.insertSteps(created.id, aiRecipe.steps);

      // ── Build response object ──
      saved.push({
        id: created.id,
        name: created.name,
        description: created.description,
        image_url: created.image_url,
        cook_time: created.cook_time,
        difficulty: created.difficulty,
        ingredients: resolvedIngredients.map((ri) => ({
          id: ri.id,
          name: ri.name,
          quantity: ri.quantity,
          unit: ri.unit
        })),
        steps: aiRecipe.steps.map((s) => ({
          step_order: s.step_order,
          content: s.content
        })),
        match_score: 0
      });
    }

    return saved;
  }
}

module.exports = { RecipeService };
