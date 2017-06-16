'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      database: 'galvanize_bookcase_dev',
      user: 'galvanize',
      password: process.env.PGPASSWORD
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST,
      database: 'galvanize_bookcase_test',
      user: 'galvanize',
      password: process.env.PGPASSWORD
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {}
};
