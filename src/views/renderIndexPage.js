module.exports = function(books) {
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
    </html>`.trim();
};
