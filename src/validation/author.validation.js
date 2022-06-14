const yup = require('yup');
const isBetweenTwoDate = require('../utils/isBetweenTwoDate');
const getNowDate = require('../utils/getNowDate');
const db = require('../models');
const isFutureDate = require('../utils/isFutureDate');
const Author = db.authors;

const getAuthorParamsObject = (bugId) => ({
  params: yup.object({
    id: yup
      .number()
      .typeError(bugId ?? '')
      .required()
      .test('authorNotFound', bugId ?? '', async (value) => {
        const findAuthor = await Author.findOne({ where: { id: value } });
        if (findAuthor) {
          return true;
        } else {
          return false;
        }
      }),
  }),
});

const authorBodyObject = {
  body: yup.object({
    firstName: yup.string('Необходимо указать имя автора').max(100).required(),
    lastName: yup.string('Необходимо указать фамилию  автора').max(100).required(),
    photo: yup.string('Пожалуйста, укажите корректный URL').url('Пожалуйста, укажите корректный URL').required('Пожалуйста, укажите корректный URL'),
    dateOfBirth: yup
      .string()
      .test('year', { year: 'Пожалуйста, укажите корректный год рождения в формате 1/1/1900', bugID: `Баг найден, необходимо сообщить разработчику. ID 15355184` }, (value) => {
        let dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        const isDate = dateRegex.test(value);
        if (!isDate) {
          return false;
        }
        const isFuture = isFutureDate(value);
        if (isFuture) {
          return false;
        }
        return true;
      })
      .test('year', 'Пожалуйста, укажите корректный год рождения в формате 1/1/1900', (value) => {
        let dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        const isDate = dateRegex.test(value);
        if (!isDate) {
          return false;
        }
        const isBeetwen = isBetweenTwoDate('1/1/1900', value, getNowDate());
        if (!isBeetwen) {
          return false;
        }
        return true;
      })
      .required('Пожалуйста, укажите корректный год рождения в формате 1/1/1900'),
    about: yup.string().max(1000, { maxLength: 'Информация об авторе не должна превышать 1000 символов' }).required('Необходимо указать информацию об  авторе'),
  }),
};
const authorBodyNotRequiredObject = {
  body: yup.object({
    firstName: yup.string('Необходимо указать имя автора').max(100),
    lastName: yup.string('Необходимо указать фамилию  автора').max(100),
    photo: yup.string('Пожалуйста, укажите корректный URL').url('Пожалуйста, укажите корректный URL'),
    dateOfBirth: yup
      .string()
      .test('year', { year: 'Пожалуйста, укажите корректный год рождения в формате 1/1/1900', bugID: `Баг найден, необходимо сообщить разработчику. ID 15355184` }, (value) => {
        if (value) {
          let dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
          const isDate = dateRegex.test(value);
          if (!isDate) {
            return false;
          }
          const isFuture = isFutureDate(value);
          if (isFuture) {
            return false;
          }
          return true;
        } else {
          return true;
        }
      })
      .test('year', 'Пожалуйста, укажите корректный год рождения в формате 1/1/1900', (value) => {
        if (value) {
          let dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
          const isDate = dateRegex.test(value);
          if (!isDate) {
            return false;
          }
          const isBeetwen = isBetweenTwoDate('1/1/1900', value, getNowDate());
          if (!isBeetwen) {
            return false;
          }
          return true;
        } else {
          return true;
        }
      }),
    about: yup.string().max(1000, { maxLength: 'Информация об авторе не должна превышать 1000 символов' }),
  }),
};

const authorValidation = yup.object(authorBodyObject);
const authorByIdValidation = yup.object(getAuthorParamsObject(87457148));
const authorDeleteValidation = yup.object(getAuthorParamsObject());

const authorUpdateValidation = yup.object({ ...authorBodyNotRequiredObject, ...getAuthorParamsObject() });
module.exports = { authorValidation, authorByIdValidation, authorUpdateValidation, authorDeleteValidation };
