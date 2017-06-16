const renderIndexPage = require('../views/renderIndexPage');

const BookRepository = require('../models/BookRepository');

const repository = new BookRepository();

module.exports = function(request, response) {
  repository.getBooks().then(books => {
    response.send(renderIndexPage(books));
  });
};
