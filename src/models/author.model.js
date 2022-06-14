module.exports = (sequelize, Sequelize) => {
  const Author = sequelize.define(
    'author',
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { len: [0, 100] },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { len: [0, 100] },
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      about: {
        type: Sequelize.TEXT,
        validate: { len: [0, 1000] },
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    },
  );
  return Author;
};
