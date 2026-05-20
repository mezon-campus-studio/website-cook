const express = require('express');
const { IngredientController } = require('../controllers/ingredient.controller');
const { validate } = require('../middlewares/validate');
const { ingredientSuggestSchema, ingredientSearchSchema } = require('../validators/schemas');

const { SpoonacularController } = require('../controllers/spoonacular.controller');

const router = express.Router();

const controller = new IngredientController();
const spoonacularController = new SpoonacularController();

/**
 * GET /ingredients/suggest?q=thit
 *
 * Query params validated by Zod before hitting the controller.
 */
router.get(
  '/suggest',
  validate(ingredientSuggestSchema, 'query'),
  controller.suggest.bind(controller)
);

/**
 * GET /ingredients/search
 *
 * Validated by Zod against the spoonacular-based validation schema.
 */
router.get(
  '/search',
  validate(ingredientSearchSchema, 'query'),
  spoonacularController.searchIngredients.bind(spoonacularController)
);

const ingredientRouter = router;

module.exports = { ingredientRouter };
