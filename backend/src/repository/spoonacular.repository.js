const { spoonacularClient } = require('../config/spoonacular');
const { logger } = require('../utils/logger');

const CONTEXT = 'SpoonacularRepository';

/**
 * Spoonacular Repository Layer.
 *
 * Replaces the old DB-based IngredientRepository & RecipeRepository
 * for the two modules: Ingredients and Recipes.
 *
 * This layer ONLY handles HTTP communication with Spoonacular API.
 * No business logic, no data mapping — just raw API calls.
 */
class SpoonacularRepository {
  /**
   * Search ingredients via Spoonacular API.
   *
   * @see https://spoonacular.com/food-api/docs#Ingredient-Search
   *
   * @param {object} params
   * @param {string} params.query        - Search term (required).
   * @param {number} [params.number]     - Max results to return (1-100).
   * @param {number} [params.offset]     - Results offset for pagination.
   * @param {string} [params.sort]       - Sort criteria (e.g. 'calories').
   * @param {string} [params.sortDirection] - 'asc' or 'desc'.
   * @param {boolean} [params.addChildren]  - Include child ingredients.
   * @param {string} [params.intolerances]  - Comma-separated intolerances.
   * @returns {Promise<object>} Raw Spoonacular response data.
   */
  async searchIngredients(params) {
    try {
      const response = await spoonacularClient.get('/food/ingredients/search', {
        params: {
          query: params.query,
          number: params.number,
          offset: params.offset,
          sort: params.sort,
          sortDirection: params.sortDirection,
          addChildren: params.addChildren,
          intolerances: params.intolerances
        }
      });

      return response.data;
    } catch (error) {
      logger.error(CONTEXT, 'searchIngredients failed', error);
      throw this._handleApiError(error);
    }
  }

  /**
   * Find recipes by ingredients via Spoonacular API.
   *
   * @see https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
   *
   * @param {object} params
   * @param {string} params.ingredients  - Comma-separated ingredient list (required).
   * @param {number} [params.number]     - Max results (1-100).
   * @param {number} [params.ranking]    - 1 = maximize used, 2 = minimize missing.
   * @param {boolean} [params.ignorePantry] - Ignore typical pantry items.
   * @returns {Promise<Array>} Raw Spoonacular response data (array of recipes).
   */
  async findRecipesByIngredients(params) {
    try {
      const response = await spoonacularClient.get('/recipes/findByIngredients', {
        params: {
          ingredients: params.ingredients,
          number: params.number,
          ranking: params.ranking,
          ignorePantry: params.ignorePantry
        }
      });

      return response.data;
    } catch (error) {
      logger.error(CONTEXT, 'findRecipesByIngredients failed', error);
      throw this._handleApiError(error);
    }
  }

  /**
   * Normalize Axios errors into application-friendly errors.
   *
   * @param {import('axios').AxiosError} error
   * @returns {Error} Enriched error with statusCode property.
   */
  _handleApiError(error) {
    // Rate limit (402 for Spoonacular when quota exceeded, or 429)
    if (error.response?.status === 402 || error.response?.status === 429) {
      const err = new Error(
        'Spoonacular API rate limit exceeded. Please try again later.'
      );
      err.statusCode = 429;
      return err;
    }

    // Unauthorized (invalid API key)
    if (error.response?.status === 401) {
      const err = new Error('Spoonacular API authentication failed. Check API key.');
      err.statusCode = 502;
      return err;
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
      const err = new Error('Spoonacular API request timed out.');
      err.statusCode = 504;
      return err;
    }

    // Network error
    if (!error.response) {
      const err = new Error('Unable to connect to Spoonacular API.');
      err.statusCode = 502;
      return err;
    }

    // Generic server error
    const err = new Error(
      `Spoonacular API error: ${error.response?.status} - ${error.response?.statusText || 'Unknown'}`
    );
    err.statusCode = error.response?.status >= 500 ? 502 : error.response?.status || 500;
    return err;
  }
}

module.exports = { SpoonacularRepository };
