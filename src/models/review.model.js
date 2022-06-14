module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define(
    'review',
    {
      userName: {
        type: Sequelize.STRING,
        defaultValue: 'Неизвестный читатель',
        allowNull: false,
        validate: { len: [0, 100] },
      },
      avatar: {
        type: Sequelize.STRING,
      },
      review: {
        type: Sequelize.TEXT,
        validate: { len: [0, 1000] },
      },
      raiting: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: { len: [0, 5] },
      },
    },
    {
      updatedAt: false,
      createdAt: 'time',
    },
  );
  return Review;
};
