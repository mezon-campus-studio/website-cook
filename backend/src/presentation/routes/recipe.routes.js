const express = require('express');
const { RecipeController } = require('../controllers/recipe.controller');
const { validate } = require('../middlewares/validate');
const { recipeSuggestSchema } = require('../validators/schemas');

const router = express.Router();

const controller = new RecipeController();

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

const recipeRouter = router;

module.exports = { recipeRouter };
