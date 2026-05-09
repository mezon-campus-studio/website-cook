const express = require('express');
const morgan = require('morgan');

const { env } = require('./config/env');
const { healthRouter } = require('./presentation/routes/health.routes');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  app.get('/', (req, res) => res.json({ name: 'backend', status: 'running' }));

  // Presentation layer routes
  app.use('/health', healthRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
  });

  // error handler (simple)
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  return app;
}

module.exports = { createApp };

