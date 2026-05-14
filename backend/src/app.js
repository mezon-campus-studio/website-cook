const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { env } = require('./config/env');
const { ingredientRouter } = require('./presentation/routes/ingredient.routes');
const { recipeRouter } = require('./presentation/routes/recipe.routes');

function createApp() {
  const app = express();

  // ── Core middleware ──
  app.use(cors());
  app.use(express.json());
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  // ── Health check ──
  app.get('/', (req, res) => res.json({ name: 'backend', status: 'running' }));

  // ── Presentation layer routes ──
  app.use('/ingredients', ingredientRouter);
  app.use('/recipes', recipeRouter);

  // ── 404 handler ──
  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  // ── Error handler ──
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  return app;
}

module.exports = { createApp };
