module.exports = function(book) {
  return `
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
  </html>`.trim();
};
