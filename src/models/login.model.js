module.exports = (sequelize, Sequelize) => {
  const Login = sequelize.define(
    'login',
    {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
      createdAt: false,
    },
  );
  return Login;
};
