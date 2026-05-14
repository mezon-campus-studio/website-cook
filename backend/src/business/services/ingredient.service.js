const { normalizeVietnamese } = require('../../utils/vietnamese');

class IngredientService {
  /**
   * @param {import('../../repository/ingredient.repository').IngredientRepository} ingredientRepository
   */
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository;
  }

  /**
   * Suggest ingredients matching the user's query.
   *
   * Priority order:
   *   1. Names whose `slug` STARTS WITH the normalized query  (prefix match)
   *   2. Names whose `slug` CONTAINS the normalized query     (substring match)
   *
   * Supports Vietnamese accent-insensitive matching:
   *   "thit bo" → matches "Thịt bò"
   *   "ca hoi"  → matches "Cá hồi"
   *
   * @param {string} query - Raw user input (may or may not have accents).
   * @returns {Promise<Array<{id: number, name: string}>>} Up to 10 ingredient objects.
   */
  async suggest(query) {
    if (!query || !query.trim()) return [];

    const normalizedQuery = normalizeVietnamese(query);
    const MAX_RESULTS = 10;

    // 1. Prefix matches first (higher priority)
    const prefixResults = await this.ingredientRepository.findByPrefix(
      normalizedQuery,
      MAX_RESULTS
    );

    const remaining = MAX_RESULTS - prefixResults.length;

    // 2. Contains matches (lower priority), only if we need more
    let containsResults = [];
    if (remaining > 0) {
      containsResults = await this.ingredientRepository.findByContains(
        normalizedQuery,
        remaining
      );
    }

    // Merge and return full objects
    const combined = [...prefixResults, ...containsResults];
    return combined.map((item) => ({
      id: item.id,
      name: item.name,
      img: item.img || null,
      create_at: item.create_at,
      update_at: item.update_at
    }));
  }
}

module.exports = { IngredientService };
