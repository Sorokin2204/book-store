const yup = require('yup');
const valideDate = require('../utils/validDate');
const valideYear = require('../utils/validYear');
const db = require('../models');
const Author = db.authors;
const Book = db.books;

const bookParamsObject = {
  params: yup.object({
    id: yup
      .number()
      .required()
      .test('bookNotFound', '', async (value) => {
        const findBook = await Book.findOne({ where: { id: value } });
        if (findBook) {
          return true;
        } else {
          return false;
        }
      }),
  }),
};
const bookParamsByAuthorObject = {
  params: yup.object({
    id: yup
      .number()
      .required()
      .test('authorNotFound', '', async (value) => {
        const findAuthor = await Author.findOne({ where: { id: value } });
        if (findAuthor) {
          return true;
        } else {
          return false;
        }
      }),
  }),
};
const bookBodyObject = {
  body: yup.object({
    title: yup.string('Необходимо указать название книги').required({ required: 'Необходимо указать название книги', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` }).max(100, 'Название книги не должно превышать 100 символов'),
    published: yup
      .string()
      .required({ required: 'Пожалуйста, укажите корректный год издания', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` })
      .test('year', 'Пожалуйста, укажите корректный год издания', (value) => valideYear(value)),
    authorId: yup
      .number('Необходимо указать ID автора')
      .required({ required: 'Необходимо указать ID автора', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` })
      .test('required', 'Такого автора не существует', async (value) => {
        const findAuthor = await Author.findOne({ where: { id: value } });
        if (findAuthor) {
          return true;
        } else {
          return false;
        }
      }),
    genre: yup.string().required({ required: 'Need genre', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` }),
    annotation: yup.string().required({ required: 'Необходимо указать жанр', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` }).max(1000, { maxLength: 'Аннотация не должна превышать 1000 символов' }),
    picture: yup.string().required({ required: 'Пожалуйста, укажите корректный URL', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` }).url('Пожалуйста, укажите корректный URL'),
    amount: yup.number('Необходимо указать количество книг на складе').required({ value: 'Необходимо указать количество книг на складе', bugID: `Баг найден, необходимо сообщить разработчику. ID 35841256` }).typeError('Необходимо указать количество книг на складе'),
    likes: yup
      .number({ value: 'Число должно быть от 0 до 10', bugID: `Баг найден, необходимо сообщить разработчику. ID 24551484` })
      .typeError({ value: 'Число должно быть от 0 до 10', bugID: `Баг найден, необходимо сообщить разработчику. ID 24551484` })
      .min(0, { value: 'Число должно быть от 0 до 10' })
      .max(10, { value: 'Число должно быть от 0 до 10' }),
    type: yup
      .string()
      .required({ required: 'Need type of book', bugID: `Баг найден, необходимо сообщить разработчику. ID 24585466` })
      .test('values', 'Must be "book", "ebook", "all"', (value) => {
        if (value === 'book' || value === 'ebook' || value === 'all') {
          return true;
        } else {
          return false;
        }
      }),
  }),
};
const bookBodyNotRequiredObject = {
  body: yup.object({
    title: yup.string('Необходимо указать название книги').max(100, 'Название книги не должно превышать 100 символов'),
    published: yup.string('Пожалуйста, укажите корректный год издания').test('year', 'Пожалуйста, укажите корректный год издания', (value) => {
      if (value) {
        return valideYear(value);
      } else {
        return true;
      }
    }),
    authorId: yup
      .number('Необходимо указать ID автора')

      .test('required', 'Такого автора не существует', async (value) => {
        if (value) {
          const findAuthor = await Author.findOne({ where: { id: value } });
          if (findAuthor) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }),
    genre: yup.string('Need genre'),
    annotation: yup.string('Аннотация не должна превышать 1000 символов').max(1000, { maxLength: 'Аннотация не должна превышать 1000 символов' }),
    picture: yup.string('Пожалуйста, укажите корректный URL').url('Пожалуйста, укажите корректный URL'),
    amount: yup.number('Необходимо указать количество книг на складе'),
    likes: yup.number({ value: 'Число должно быть от 0 до 10' }).min(0, { value: 'Число должно быть от 0 до 10' }).max(10, { value: 'Число должно быть от 0 до 10' }),
    type: yup.string('Must be "book", "ebook", "all"').test('values', 'Must be "book", "ebook", "all"', (value) => {
      if (value) {
        if (value === 'book' || value === 'ebook' || value === 'all') {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }),
  }),
};

const bookValidation = yup.object(bookBodyObject);
const bookByIdValidation = yup.object(bookParamsObject);
const bookDeleteValidation = yup.object(bookParamsObject);
const bookByAuthorValidation = yup.object(bookParamsByAuthorObject);
const bookUpdateAllValidation = yup.object({ ...bookBodyObject, ...bookParamsObject });
const bookUpdateValidation = yup.object({ ...bookBodyNotRequiredObject, ...bookParamsObject });
module.exports = { bookValidation, bookByIdValidation, bookByAuthorValidation, bookUpdateAllValidation, bookUpdateValidation, bookDeleteValidation };
