const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
require('express-async-errors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

// Routers
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();
logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB: ', err.message);
  });

app.use(cors());
app.use(express.json());
morgan.token('body', (req) => JSON.stringify(req.body));

app.use(
  morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === 'POST') {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        tokens.body(req, res),
      ].join(' ');
    }
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);

// Use tokenExtractor midddleware

app.use(middleware.tokenExtractor);

// Use routers

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

// Other middlewares

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
