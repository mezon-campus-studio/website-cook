const { mapIngredientSearchResult } = require('../mappers/spoonacular.mapper');

class IngredientService {
  /**
   * @param {import('../../repository/spoonacular.repository').SpoonacularRepository} spoonacularRepository
   */
  constructor(spoonacularRepository) {
    this.spoonacularRepository = spoonacularRepository;
  }

  /**
   * Suggest ingredients matching the user's query using Spoonacular API.
   *
   * @param {string} query - Raw user input.
   * @returns {Promise<Array<{id: number, name: string}>>} Up to 10 ingredient objects.
   */
  async suggest(query) {
    if (!query || !query.trim()) return [];

    const rawData = await this.spoonacularRepository.searchIngredients({
      query: query,
      number: 10
    });

    const mapped = mapIngredientSearchResult(rawData);
    return mapped.data;
  }
}

module.exports = { IngredientService };
