const { RecipeService } = require('../../business/services/recipe.service');
const { SpoonacularRepository } = require('../../repository/spoonacular.repository');
const { success, error: sendError } = require('../../utils/response');

class RecipeController {
  constructor() {
    // Manual dependency injection using SpoonacularRepository
    const spoonacularRepository = new SpoonacularRepository();

    this.recipeService = new RecipeService(spoonacularRepository);
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

      const statusCode = err.statusCode || 500;
      return sendError(res, err.message || 'Failed to suggest recipes', statusCode);
    }
  }
}

module.exports = { RecipeController };
