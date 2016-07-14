var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'production';
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
  db:'mongo ds019472.mlab.com:19472/heroku_c0ccs3tt -u <sneha> -p <123>'
  development: {
    root: rootPath,
    app: {
      name: 'bookseller'
    },
    port: process.env.PORT || 3000,
    //db: 'mongodb://localhost/BookStore'

  }
};

module.exports = config[env];
