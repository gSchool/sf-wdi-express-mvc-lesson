'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const morganMiddleware = require('morgan');
const path = require('path');

const indexRouter = require('./src/routers/indexRouter');
const bookRouter = require('./src/routers/bookRouter');

const app = express();
app.disable('x-powered-by');

switch (app.get('env')) {
  case 'development':
    app.use(morganMiddleware('dev'));
    break;
  case 'production':
    app.use(morganMiddleware('short'));
    break;
  default:
    break;
}

app.use(express.static(path.join('public')));

app.use(indexRouter);
app.use(bookRouter);

// app.use((request, response) => {
//   response.sendStatus(404);
// });

app.use((error, request, response, next) => {
  console.error(error.stack); // eslint-disable-line
  response.status(error.httpStatusCode || 500).set('Content-Type', error.httpContentType || 'text/plain').send(error.message);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') === 'test') return;
  console.log(`Listening on port ${port}`); //eslint-disable-line no-console
});

module.exports = app;
