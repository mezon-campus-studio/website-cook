const { IngredientService } = require('../../business/services/ingredient.service');
const { IngredientRepository } = require('../../repository/ingredient.repository');
const { success, error: sendError } = require('../../utils/response');

class IngredientController {
  constructor() {
    // Manual dependency injection
    const repository = new IngredientRepository();
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
      return sendError(res, 'Failed to fetch ingredient suggestions');
    }
  }
}

module.exports = { IngredientController };
