var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
/*
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bookseller'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bookseller-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'bookseller'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bookseller-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'bookseller'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/bookseller-production'
  }
};*/
var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bookseller'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/BookStore'
  }
};

module.exports = config[env];
