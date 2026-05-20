/**
 * Spoonacular Data Mapper.
 *
 * Transforms raw Spoonacular API responses into the internal
 * response format that our API consumers expect.
 *
 * Keeps mapping logic isolated from business logic and transport layer.
 */

const SPOONACULAR_IMAGE_BASE_URL = 'https://img.spoonacular.com/ingredients_100x100';

/**
 * Map Spoonacular ingredient search response to internal format.
 *
 * Input (raw Spoonacular):
 *   { results: [{ id, name, image }], offset, number, totalResults }
 *
 * Output (internal):
 *   {
 *     data: [{ id, name, image }],
 *     pagination: { offset, number, totalResults }
 *   }
 *
 * @param {object} raw - Raw Spoonacular searchIngredients response.
 * @returns {{ data: Array, pagination: object }}
 */
function mapIngredientSearchResult(raw) {
  const results = raw?.results || [];
  const data = results.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image
      ? `${SPOONACULAR_IMAGE_BASE_URL}/${item.image}`
      : null
  }));

  const pagination = {
    offset: raw?.offset ?? 0,
    number: raw?.number ?? results.length,
    totalResults: raw?.totalResults ?? results.length
  };

  return { data, pagination };
}

/**
 * Map Spoonacular findByIngredients response to internal format.
 *
 * Input (raw Spoonacular):
 *   Array of recipe objects with usedIngredients, missedIngredients, etc.
 *
 * Output (internal):
 *   Array of simplified recipe objects.
 *
 * @param {Array} raw - Raw Spoonacular findByIngredients response (array).
 * @returns {Array}
 */
function mapRecipesByIngredients(raw) {
  if (!Array.isArray(raw)) return [];

  return raw.map((recipe) => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image || null,
    likes: recipe.likes ?? 0,
    usedIngredientCount: recipe.usedIngredientCount ?? 0,
    missedIngredientCount: recipe.missedIngredientCount ?? 0,
    usedIngredients: (recipe.usedIngredients || []).map((ing) => ({
      id: ing.id,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit || ''
    })),
    missedIngredients: (recipe.missedIngredients || []).map((ing) => ({
      id: ing.id,
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit || ''
    }))
  }));
}

module.exports = { mapIngredientSearchResult, mapRecipesByIngredients };
