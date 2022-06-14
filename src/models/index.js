const Sequelize = require('sequelize');
const reset = require('../setup');
const setupRelationship = require('../setupRelationship');

const sequelize = new Sequelize('bookstore', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//MODELS
db.logins = require('./login.model')(sequelize, Sequelize);
db.books = require('./book.model')(sequelize, Sequelize);
db.reviews = require('./review.model')(sequelize, Sequelize);
db.authors = require('./author.model')(sequelize, Sequelize);

setupRelationship(db);

module.exports = db;
