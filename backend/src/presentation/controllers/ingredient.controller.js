const { IngredientService } = require('../../business/services/ingredient.service');
const { SpoonacularRepository } = require('../../repository/spoonacular.repository');
const { success, error: sendError } = require('../../utils/response');

class IngredientController {
  constructor() {
    // Manual dependency injection using SpoonacularRepository
    const repository = new SpoonacularRepository();
    this.ingredientService = new IngredientService(repository);
  }

  /**
   * GET /ingredients/suggest?q=...
   */
  async suggest(req, res, next) {
    try {
      const { q } = req.query;
      const suggestions = await this.ingredientService.suggest(q);
      return success(res, suggestions);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('IngredientController.suggest error:', err);
      const statusCode = err.statusCode || 500;
      return sendError(res, err.message || 'Failed to fetch ingredient suggestions', statusCode);
    }
  }
}

module.exports = { IngredientController };
