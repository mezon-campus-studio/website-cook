const express = require('express');
const { IngredientController } = require('../controllers/ingredient.controller');
const { validate } = require('../middlewares/validate');
const { ingredientSuggestSchema } = require('../validators/schemas');

const router = express.Router();

const controller = new IngredientController();

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

const ingredientRouter = router;

module.exports = { ingredientRouter };
