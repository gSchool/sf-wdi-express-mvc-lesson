const renderBookPage = require('../views/renderBookPage');

const BookRepository = require('../models/BookRepository');

const repository = new BookRepository();

module.exports = function(request, response, next) {
  if (!/^\d+$/.test(request.params.id)) {
    next();
    return;
  }
  const id = parseInt(request.params.id);

  repository
    .getBook(id)
    .then(book => {
      if (!book) {
        next();
        return;
      }
      response.send(renderBookPage(book));
    })
    .catch(error => {
      next(error);
    });
};
