const yup = require('yup');

const loginValidation = yup.object({
  body: yup.object({
    login: yup.string().min(3).required(),
    password: yup.string().min(5).required(),
  }),
});

module.exports = loginValidation;
