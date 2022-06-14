const Router = require('express');
const router = new Router();
const loginController = require('../controller/login.controller');
const auth = require('../middleware/auth');
const { errorWrapper } = require('../middleware/customError');
const validate = require('../middleware/validate');
const validateLogin = require('../middleware/validateLogin');
const loginValidation = require('../validation/login.validation');

router.post('/login', errorWrapper(validateLogin(loginValidation)), errorWrapper(auth), errorWrapper(loginController.login));

// router.post('/user/login', userController.loginUser);
// router.post('/user/logout', userController.logoutUser);
// router.get('/refresh', userController.refreshUser);
module.exports = router;
