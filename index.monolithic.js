'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { camelizeKeys } = require('humps');
const express = require('express');
const morganMiddleware = require('morgan');
const path = require('path');

const knex = require('./knex');

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

app.get('/', (request, response) => {
  knex.select('*').from('books').then(records => {
    const books = camelizeKeys(records);
    response.send(
      `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Galvanize Bookcase</title>
    <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="/css/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="/css/styles.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body class="blue-grey lighten-5">
    <div class="navbar-fixed">
      <nav class="blue-grey darken-2">
        <div class="nav-wrapper">
          <a href="/" class="brand-logo">
            <span><img class="logo-png" src="/images/galvanize.png" /></span>
            <span class="logo-text">bookcase</span>
          </a>
        </div>
      </nav>
    </div>
    <main>
      <div class="container">
        <h2>Books</h2>
        <div id="books" class="row">
          ${books
            .map(book =>
              `
<div class="col s6 m4 l3">
  <div class="card">
  <a href="/books/${book.id}" data-delay="50" data-tooltip="${book.title}">
    <div class="card-image">
      <img src="${book.coverUrl}" alt="${book.title}">
    </div>
  </a>
  </div>
</div>
`.trim()
            )
            .join('')}
        </div>
      </div>
    </main>
    <footer class="page-footer blue-grey">
      <div class="footer-copyright"><small>© 2017 Galvanize, Inc. All Rights Reserved</small></div>
    </footer>
    <script type="text/javascript" src="/js/vendor/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="/js/vendor/materialize.min.js"></script>
  </body>
</html>`.trim()
    );
  });
});

app.get('/books/:id', (request, response, next) => {
  if (!/^\d+$/.test(request.params.id)) {
    next();
    return;
  }
  const id = parseInt(request.params.id);

  knex
    .select('*')
    .from('books')
    .where({ id })
    .first()
    .then(record => {
      if (!record) {
        next();
        return;
      }
      const book = camelizeKeys(record);
      response.send(
        `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Galvanize Bookcase</title>
    <link href="//fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="/css/materialize.min.css"  media="screen,projection"/>
    <link type="text/css" rel="stylesheet" href="/css/styles.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body class="blue-grey lighten-5">
    <div class="navbar-fixed">
      <nav class="blue-grey darken-2">
        <div class="nav-wrapper">
          <a href="/" class="brand-logo">
            <span><img class="logo-png" src="/images/galvanize.png" /></span>
            <span class="logo-text">bookcase</span>
          </a>
        </div>
      </nav>
    </div>
    <main>
      <div class="container">
        <div class="row">
          <div class="col s12 m4">
            <img id="cover" src="${book.coverUrl}" alt="${book.title}">
          </div>
          <div id="book" class="col s12 m8">
            <h3 id="title">${book.title}</h3>
            <h5>By <span id="author">${book.author}</span></h5>
            <p id="description" class="flow-text">${book.description}</p>
            <h6>Genre: <span id="genre">${book.genre}</span></h6>
          </div>
        </div>
      </div>
    </main>
    <footer class="page-footer blue-grey">
      <div class="footer-copyright"><small>© 2017 Galvanize, Inc. All Rights Reserved</small></div>
    </footer>
    <script type="text/javascript" src="/js/vendor/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="/js/vendor/materialize.min.js"></script>
  </body>
</html>`.trim()
      );
    })
    .catch(error => {
      next(error);
    });
});

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
