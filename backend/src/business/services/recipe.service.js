const { mapRecipesByIngredients } = require('../mappers/spoonacular.mapper');

/**
 * Recipe Service Layer.
 *
 * Implements business logic for Recipes, completely refactored to fetch
 * directly from external Spoonacular API instead of internal Supabase database.
 */
class RecipeService {
  /**
   * @param {import('../../repository/spoonacular.repository').SpoonacularRepository} spoonacularRepository
   */
  constructor(spoonacularRepository) {
    this.spoonacularRepository = spoonacularRepository;
  }

  /**
   * Suggest recipes matching the specified ingredient names.
   *
   * @param {string[]} ingredientNames
   * @returns {Promise<Array>} Up to 10 recipe objects.
   */
  async suggest(ingredientNames) {
    if (!ingredientNames || !ingredientNames.length) return [];

    // Spoonacular's findByIngredients API expects a comma-separated string
    const queryIngredients = ingredientNames.join(',');
    
    const rawData = await this.spoonacularRepository.findRecipesByIngredients({
      ingredients: queryIngredients,
      number: 10
    });

    return mapRecipesByIngredients(rawData);
  }
}

module.exports = { RecipeService };
