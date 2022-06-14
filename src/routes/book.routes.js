const Router = require('express');
const bookController = require('../controller/book.controller');
const router = new Router();
const loginController = require('../controller/login.controller');
const auth = require('../middleware/auth');
const { errorWrapper } = require('../middleware/customError');
const validate = require('../middleware/validate');
const validateLogin = require('../middleware/validateLogin');
const { bookValidation, bookByIdValidation, bookByAuthorValidation, bookUpdateAllValidation, bookUpdateValidation, bookDeleteValidation } = require('../validation/book.validation');
const loginValidation = require('../validation/login.validation');

router.post('/book/add', errorWrapper(validate(bookValidation)), errorWrapper(auth), errorWrapper(bookController.createBook));

router.get('/book', errorWrapper(auth), errorWrapper(bookController.getBooks));

router.get('/book/:id', errorWrapper(validate(bookByIdValidation)), errorWrapper(auth), errorWrapper(bookController.getBookById));

router.get('/author/:id/book', errorWrapper(validate(bookByAuthorValidation)), errorWrapper(auth), errorWrapper(bookController.getBooksByAuthor));

router.put('/book/:id', errorWrapper(validate(bookUpdateAllValidation)), errorWrapper(auth), errorWrapper(bookController.updateAllBook));

router.patch('/book/:id', errorWrapper(validate(bookUpdateValidation)), errorWrapper(auth), errorWrapper(bookController.updateBook));

router.delete('/book/:id', errorWrapper(validate(bookDeleteValidation)), errorWrapper(auth), errorWrapper(bookController.deleteBook));

module.exports = router;
