const Router = require('express');
const authorController = require('../controller/author.controller');
const router = new Router();
const auth = require('../middleware/auth');
const { errorWrapper } = require('../middleware/customError');
const validate = require('../middleware/validate');
const { authorValidation, authorByIdValidation, authorUpdateAllValidation, authorUpdateValidation, authorDeleteValidation } = require('../validation/author.validation');

router.post('/author/add', errorWrapper(validate(authorValidation)), errorWrapper(auth), errorWrapper(authorController.createAuthor));

router.get('/author', errorWrapper(auth), errorWrapper(authorController.getAuthors));

router.get('/author/:id', errorWrapper(validate(authorByIdValidation)), errorWrapper(auth), errorWrapper(authorController.getAuthorById));

router.patch('/author/:id', errorWrapper(validate(authorUpdateValidation)), errorWrapper(auth), errorWrapper(authorController.updateAuthor));

router.delete('/author/:id', errorWrapper(validate(authorDeleteValidation)), errorWrapper(auth), errorWrapper(authorController.deleteAuthor));
module.exports = router;
