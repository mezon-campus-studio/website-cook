const express = require('express');
const { RecipeController } = require('../controllers/recipe.controller');
const { validate } = require('../middlewares/validate');
const { recipeSuggestSchema, recipeByIngredientsSchema } = require('../validators/schemas');
const { SpoonacularController } = require('../controllers/spoonacular.controller');

const router = express.Router();

const controller = new RecipeController();
const spoonacularController = new SpoonacularController();

/**
 * POST /recipes/suggest
 *
 * Body: { ingredients: ["Cá hồi", "Bơ", "Chanh vàng"] }
 * Validated by Zod before hitting the controller.
 */
router.post(
  '/suggest',
  validate(recipeSuggestSchema, 'body'),
  controller.suggest.bind(controller)
);

/**
 * GET /recipes/by-ingredients
 *
 * Validated by Zod against the spoonacular recipe validation schema.
 */
router.get(
  '/by-ingredients',
  validate(recipeByIngredientsSchema, 'query'),
  spoonacularController.findRecipesByIngredients.bind(spoonacularController)
);

const recipeRouter = router;

module.exports = { recipeRouter };
