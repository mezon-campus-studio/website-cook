const { supabase } = require('../config/supabase');

class IngredientRepository {
  /**
   * Search ingredients whose slug starts with the given prefix.
   * Uses the `slug` column (accent-free, lowercase version of `name`).
   *
   * @param {string} normalizedQuery - Accent-free, lowercased search term.
   * @param {number} limit
   * @returns {Promise<Array<{id: number, name: string, slug: string}>>}
   */
  async findByPrefix(normalizedQuery, limit = 10) {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .ilike('slug', `${normalizedQuery}%`)
      .order('name', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Search ingredients whose slug contains the given substring
   * but does NOT start with it (avoids duplicates with findByPrefix).
   *
   * @param {string} normalizedQuery
   * @param {number} limit
   * @returns {Promise<Array<{id: number, name: string, slug: string}>>}
   */
  async findByContains(normalizedQuery, limit = 10) {
    const { data, error } = await supabase
      .from('ingredients')
      .select('*')
      .ilike('slug', `%${normalizedQuery}%`)
      .not('slug', 'ilike', `${normalizedQuery}%`)
      .order('name', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  /**
   * Find ingredients by exact names (case-insensitive).
   * @param {string[]} names
   * @returns {Promise<Array<{id: number, name: string}>>}
   */
  async findByNames(names) {
    if (!names.length) return [];

    const { data, error } = await supabase
      .from('ingredients')
      .select('id, name')
      .in('name', names);

    if (error) throw error;
    return data || [];
  }

  /**
   * Find a single ingredient by exact name.
   * @param {string} name
   * @returns {Promise<{id: number, name: string} | null>}
   */
  async findByName(name) {
    const { data, error } = await supabase
      .from('ingredients')
      .select('id, name')
      .eq('name', name)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  /**
   * Insert a new ingredient row.
   * @param {string} name
   * @param {string} slug - Normalized (accent-free, lowercase) version.
   * @returns {Promise<{id: number, name: string}>}
   */
  async create(name, slug) {
    const { data, error } = await supabase
      .from('ingredients')
      .insert({ name, slug })
      .select('id, name')
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Find-or-create: returns existing ingredient or inserts a new one.
   * @param {string} name
   * @param {string} slug
   * @returns {Promise<{id: number, name: string}>}
   */
  async findOrCreate(name, slug) {
    // Try to find first
    const existing = await this.findByName(name);
    if (existing) return existing;

    // Create new
    return this.create(name, slug);
  }
}

module.exports = { IngredientRepository };
