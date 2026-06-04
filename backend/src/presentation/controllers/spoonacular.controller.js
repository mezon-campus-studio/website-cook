const { SpoonacularService } = require('../../business/services/spoonacular.service');
const { SpoonacularRepository } = require('../../repository/spoonacular.repository');
const { success, error: sendError } = require('../../utils/response');
const { logger } = require('../../utils/logger');

const CONTEXT = 'SpoonacularController';

class SpoonacularController {
  constructor() {
    // Manual dependency injection maintaining Layered Architecture
    const spoonacularRepository = new SpoonacularRepository();
    this.spoonacularService = new SpoonacularService(spoonacularRepository);
  }

  /**
   * GET /ingredients/search
   * Query params: query, addChildren, intolerances, sort, sortDirection, number, offset
   */
  async searchIngredients(req, res, next) {
    try {
      // Query parameters are already validated and type-coerced by Zod middleware
      const params = req.query;

      const result = await this.spoonacularService.searchIngredients(params);

      return success(res, result.data, 200, {
        pagination: result.pagination
      });
    } catch (err) {
      logger.error(CONTEXT, 'searchIngredients error handler', err);

      const statusCode = err.statusCode || 500;
      return sendError(
        res,
        err.message || 'Failed to search ingredients from external provider.',
        statusCode
      );
    }
  }

  /**
   * GET /recipes/by-ingredients
   * Query params: ingredients, number, ranking, ignorePantry
   */
  async findRecipesByIngredients(req, res, next) {
    try {
      // Query parameters are already validated and type-coerced by Zod middleware
      const params = req.query;

      const result = await this.spoonacularService.findRecipesByIngredients(params);

      return success(res, result);
    } catch (err) {
      logger.error(CONTEXT, 'findRecipesByIngredients error handler', err);

      const statusCode = err.statusCode || 500;
      return sendError(
        res,
        err.message || 'Failed to find recipes by ingredients from external provider.',
        statusCode
      );
    }
  }
}

module.exports = { SpoonacularController };
