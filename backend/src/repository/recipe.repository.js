const { supabase } = require('../config/supabase');

class RecipeRepository {
  /**
   * Find recipes that contain ANY of the given ingredient IDs.
   *
   * Uses `recipe_ingredients.ingredients_id` (NOT `ingredient_id`)
   * and `recipe_ingredients.recipes_id` (NOT `recipe_id`).
   *
   * Returns recipes with their full ingredient + step data so the
   * business layer can score and format them.
   *
   * @param {number[]} ingredientIds
   * @returns {Promise<Array>}
   */
  async findByIngredientIds(ingredientIds) {
    if (!ingredientIds.length) return [];

    // Step 1: Get distinct recipe IDs that contain at least one ingredient
    const { data: links, error: linkErr } = await supabase
      .from('recipe_ingredients')
      .select('recipes_id')
      .in('ingredients_id', ingredientIds);

    if (linkErr) throw linkErr;
    if (!links || !links.length) return [];

    const recipeIds = [...new Set(links.map((l) => l.recipes_id))];

    // Step 2: Fetch full recipe data with ingredients + steps
    const { data: recipes, error: recipeErr } = await supabase
      .from('recipes')
      .select(`
        id,
        name,
        description,
        image_url,
        cook_time,
        difficulty,
        created_at,
        recipe_ingredients (
          ingredients_id,
          quantity,
          unit,
          is_require,
          ingredients ( id, name )
        ),
        recipe_steps (
          step_order,
          content,
          image_url,
          duration
        )
      `)
      .in('id', recipeIds)
      .order('created_at', { ascending: false });

    if (recipeErr) throw recipeErr;
    return recipes || [];
  }

  /**
   * Insert a recipe row.
   *
   * @param {{ name: string, description: string, image_url?: string, cook_time?: number, difficulty?: string }} recipe
   * @returns {Promise<object>} Created recipe row.
   */
  async create(recipe) {
    const { data, error } = await supabase
      .from('recipes')
      .insert({
        name: recipe.name,
        description: recipe.description,
        image_url: recipe.image_url || null,
        cook_time: recipe.cook_time || null,
        difficulty: recipe.difficulty || null
      })
      .select('id, name, description, image_url, cook_time, difficulty, created_at')
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Insert ingredient links for a recipe.
   *
   * @param {number} recipeId
   * @param {Array<{ ingredients_id: number, quantity?: string, unit?: string, is_require?: boolean }>} ingredients
   */
  async linkIngredients(recipeId, ingredients) {
    if (!ingredients.length) return;

    const rows = ingredients.map((ing) => ({
      recipes_id: recipeId,
      ingredients_id: ing.ingredients_id,
      quantity: ing.quantity || null,
      unit: ing.unit || null,
      is_require: ing.is_require !== undefined ? ing.is_require : true
    }));

    const { error } = await supabase
      .from('recipe_ingredients')
      .insert(rows);

    if (error) throw error;
  }

  /**
   * Insert steps for a recipe.
   *
   * @param {number} recipeId
   * @param {Array<{ step_order: number, content: string, image_url?: string, duration?: number }>} steps
   */
  async insertSteps(recipeId, steps) {
    if (!steps.length) return;

    const rows = steps.map((s) => ({
      recipe_id: recipeId,
      step_order: s.step_order,
      content: s.content,
      image_url: s.image_url || null,
      duration: s.duration || null
    }));

    const { error } = await supabase
      .from('recipe_steps')
      .insert(rows);

    if (error) throw error;
  }

  /**
   * Fetch a single recipe by ID with full ingredient + step details.
   *
   * @param {number} recipeId
   * @returns {Promise<object|null>}
   */
  async findById(recipeId) {
    const { data, error } = await supabase
      .from('recipes')
      .select(`
        id,
        name,
        description,
        image_url,
        cook_time,
        difficulty,
        created_at,
        recipe_ingredients (
          ingredients_id,
          quantity,
          unit,
          is_require,
          ingredients ( id, name )
        ),
        recipe_steps (
          step_order,
          content,
          image_url,
          duration
        )
      `)
      .eq('id', recipeId)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Fetch ingredient details (id + name) for a list of ingredient IDs.
   *
   * @param {number[]} ingredientIds
   * @returns {Promise<Array<{id: number, name: string}>>}
   */
  async getIngredientsByIds(ingredientIds) {
    if (!ingredientIds.length) return [];

    const { data, error } = await supabase
      .from('ingredients')
      .select('id, name')
      .in('id', ingredientIds);

    if (error) throw error;
    return data || [];
  }
}

module.exports = { RecipeRepository };
