const valideYear = require('../utils/validYear');
const { CustomError } = require('./customError.model');

module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define(
    'book',
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { len: [0, 100] },
      },
      published: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //   validYear(value, done) {
        //     console.log(valideYear(value));
        //     if (valideYear(value)) {
        //     } else {
        //       throw new CustomError(400, 'Пожалуйста, укажите корректный год издания');
        //     }
        //   },
        // },
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      annotation: {
        type: Sequelize.TEXT,
        validate: { len: [0, 1000] },
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: { len: [0, 10] },
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['book', 'ebook', 'all']],
        },
      },
    },
    {
      updatedAt: false,
    },
  );
  return Book;
};
