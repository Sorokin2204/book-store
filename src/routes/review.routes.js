const Router = require('express');
const reviewController = require('../controller/review.controller');
const router = new Router();
const auth = require('../middleware/auth');
const { errorWrapper } = require('../middleware/customError');
const validate = require('../middleware/validate');
const { reviewValidation, reviewByIdValidation, reviewUpdateAllValidation, reviewUpdateValidation, reviewDeleteValidation, reviewByBookValidation } = require('../validation/review.validation');

router.post('/review/add', errorWrapper(validate(reviewValidation)), errorWrapper(auth), errorWrapper(reviewController.createReview));

router.get('/review', errorWrapper(auth), errorWrapper(reviewController.getReviews));

router.get('/review/:id', errorWrapper(validate(reviewByIdValidation)), errorWrapper(auth), errorWrapper(reviewController.getReviewById));

router.get('/review/:id/book', errorWrapper(validate(reviewByBookValidation)), errorWrapper(auth), errorWrapper(reviewController.getReviewsByBook));

router.patch('/review/:id', errorWrapper(validate(reviewUpdateValidation)), errorWrapper(auth), errorWrapper(reviewController.updateReview));

router.delete('/review/:id', errorWrapper(validate(reviewDeleteValidation)), errorWrapper(auth), errorWrapper(reviewController.deleteReview));

module.exports = router;
