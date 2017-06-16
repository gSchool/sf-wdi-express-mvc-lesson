const knex = require('../knex');

const { camelizeKeys } = require('humps');

class BookRepository {
  getBooks() {
    return knex.select('*').from('books').then(records => camelizeKeys(records));
  }

  getBook(id) {
    return knex.select('*').from('books').where({ id }).first().then(record => (record ? camelizeKeys(record) : undefined));
  }
}

module.exports = BookRepository;
