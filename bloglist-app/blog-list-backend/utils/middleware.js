const logger = require('./logger');

require('dotenv').config();

// Get token before every request

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Malformatted id' });
  }
  if (err.name === 'ValidationError') {
    return res
      .status(400)
      .json({ error: `${err.name}: ${err.message}`, errorName: err.name }); // we send the error message as well as the error name so we can differentiate between multiple types of errors
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Missing or invalid token',
    });
  }
  logger.error(err.message);

  return next(err);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
