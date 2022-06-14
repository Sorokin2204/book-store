require('dotenv').config();
const db = require('../models');
const Login = db.logins;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { CustomError } = require('../models/customError.model');
class LoginController {
  async login(req, res) {
    const { login, password } = req.body;
    // await Login.create({ login, password: await bcrypt.hash(password, 3) });
    // res.json({});
    const loginFind = await Login.findOne({ raw: true, where: { login } });
    if (!loginFind) {
      throw new CustomError(400, {
        errorMessage: 'Неправильный логин или пароль',
      });
    }
    const validPassword = bcrypt.compareSync(password, loginFind.password);
    if (!validPassword) {
      throw new CustomError(400, {
        errorMessage: 'Неправильный логин или пароль',
      });
    }

    const token = jwt.sign(loginFind.login, process.env.SECRET_TOKEN, {});
    res.json({ token });
  }
}

module.exports = new LoginController();
