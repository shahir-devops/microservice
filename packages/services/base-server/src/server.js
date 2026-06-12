const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

function createServer({
  name,
  routes,
  port
}) {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  app.get('/health', (req, res) => res.json({ ok: true, service: name }));

  if (routes) app.use('/', routes);

  // error handler
  app.use((err, req, res, next) => {
    const status = err.statusCode || 400;
    res.status(status).json({
      ok: false,
      message: err.message || 'Bad Request',
      details: err.details
    });
  });

  const listen = port || process.env.PORT || 3000;
  const server = app.listen(listen, () => {
    console.log(`[${name}] listening on :${listen}`);
  });

  return { app, server };
}

module.exports = { createServer };

