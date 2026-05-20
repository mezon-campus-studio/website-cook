const { mapIngredientSearchResult, mapRecipesByIngredients } = require('../mappers/spoonacular.mapper');
const { logger } = require('../../utils/logger');

const CONTEXT = 'SpoonacularService';

/**
 * Spoonacular Service Layer.
 *
 * Implements business logic and maps external API structures
 * to unified internal formats using the Spoonacular Mapper.
 */
class SpoonacularService {
  /**
   * @param {import('../../repository/spoonacular.repository').SpoonacularRepository} spoonacularRepository
   */
  constructor(spoonacularRepository) {
    this.spoonacularRepository = spoonacularRepository;
  }

  /**
   * Search for ingredients matching standard criteria.
   *
   * @param {object} params
   * @param {string} params.query
   * @param {boolean} [params.addChildren]
   * @param {string} [params.intolerances]
   * @param {string} [params.sort]
   * @param {string} [params.sortDirection]
   * @param {number} [params.number]
   * @param {number} [params.offset]
   * @returns {Promise<{data: Array, pagination: object}>}
   */
  async searchIngredients(params) {
    logger.info(CONTEXT, `Searching ingredients with query: "${params.query}"`);
    const rawData = await this.spoonacularRepository.searchIngredients(params);
    return mapIngredientSearchResult(rawData);
  }

  /**
   * Find recipes based on a list of ingredients.
   *
   * @param {object} params
   * @param {string} params.ingredients - Comma-separated list of ingredients.
   * @param {number} [params.number]
   * @param {number} [params.ranking]
   * @param {boolean} [params.ignorePantry]
   * @returns {Promise<Array>}
   */
  async findRecipesByIngredients(params) {
    logger.info(CONTEXT, `Finding recipes by ingredients: "${params.ingredients}"`);
    const rawData = await this.spoonacularRepository.findRecipesByIngredients(params);
    return mapRecipesByIngredients(rawData);
  }
}

module.exports = { SpoonacularService };
