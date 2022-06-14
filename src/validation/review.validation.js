const yup = require('yup');
const db = require('../models');
const Review = db.reviews;
const Book = db.books;

const reviewParamsObject = {
  params: yup.object({
    id: yup
      .number()
      .required()
      .test('reviewNotFound', '', async (value) => {
        const findReview = await Review.findOne({ where: { id: value } });
        if (findReview) {
          return true;
        } else {
          return false;
        }
      }),
  }),
};

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

const reviewBodyObject = {
  body: yup.object({
    userName: yup.string().max(100, { maxLength: 'Имя не должно превышать 100 символов' }).required('Необходимо указать ваше имя'),
    review: yup.string().max(1000, { maxLength: 'Длинна отзыва не должна превышать 1000 символов' }).required('Необходимо указать текст отзыва'),

    bookId: yup
      .number('Необходимо указать ID книги')
      .required('Необходимо указать ID книги')
      .test('required', 'Такой книги не существует', async (value) => {
        const findBook = await Book.findOne({ where: { id: value } });
        if (findBook) {
          return true;
        } else {
          return false;
        }
      }),
    avatar: yup.string().url({ url: 'Пожалуйста, укажите корректный URL', bugID: 'Баг найден, необходимо сообщить разработчику. ID 22222222' }).required('Пожалуйста, укажите корректный URL'),
    raiting: yup.number('Рейтинг может быть от 0 до 5').max(5, { maxLength: 'Рейтинг не может быть больше 5' }),
  }),
};
const reviewBodyNotRequiredObject = {
  body: yup.object({
    userName: yup.string().max(100, { maxLength: 'Имя не должно превышать 100 символов' }),
    review: yup.string().max(1000, { maxLength: 'Длинна отзыва не должна превышать 1000 символов' }),
    bookId: yup.number('Необходимо указать ID книги').test('required', 'Такой книги не существует', async (value) => {
      if (value) {
        const findBook = await Book.findOne({ where: { id: value } });
        if (findBook) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }),
    avatar: yup.string().url('Пожалуйста, укажите корректный URL'),
    raiting: yup.number('Рейтинг может быть от 0 до 5').max(5, { maxLength: 'Рейтинг не может быть больше 5' }),
  }),
};

const reviewValidation = yup.object(reviewBodyObject);
const reviewByIdValidation = yup.object(reviewParamsObject);
const reviewDeleteValidation = yup.object(reviewParamsObject);
const reviewByBookValidation = yup.object(bookParamsObject);

const reviewUpdateValidation = yup.object({ ...reviewBodyNotRequiredObject, ...reviewParamsObject });
module.exports = { reviewValidation, reviewByIdValidation, reviewUpdateValidation, reviewDeleteValidation, reviewByBookValidation };
