const db = require('../models');
const { CustomError, TypeError } = require('../models/customError.model');
const validBodyKeys = require('../utils/validBodyKeys');
const Review = db.reviews;

const reviewBodyProps = ['userName', 'review', 'bookId', 'avatar', 'raiting'];

class ReviewController {
  async createReview(req, res) {
    const { userName, review, bookId, avatar, raiting } = req.body;
    if (!validBodyKeys(reviewBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    const newReview = await Review.create({
      userName,
      review,
      bookId,
      avatar,
      raiting,
    });
    res.status(404).json({ bugID: 'Баг найден, необходимо сообщить разработчику. ID 35265122', ...newReview.get({ plain: true }) });
  }

  async getReviews(req, res) {
    const reviews = await Review.findAll({ order: [['userName', 'DESC']] });
    res.json(reviews);
  }

  async getReviewById(req, res) {
    const { id } = req.params;
    const review = await Review.findOne({
      where: { id },
    });
    res.json(review);
  }

  async getReviewsByBook(req, res) {
    const { id } = req.params;
    const reviewsByBook = await Review.findAll({
      where: { bookId: id },
      order: [
        ['time', 'DESC'],
        ['id', 'DESC'],
      ],
    });
    res.json(reviewsByBook);
  }

  async updateAllReview(req, res) {
    const { id } = req.params;
    const { userName, review, bookId, avatar, raiting } = req.body;
    if (!validBodyKeys(reviewBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    const isUpdateReview = await Review.update(
      {
        userName,
        review,
        bookId,
        avatar,
        raiting,
      },
      { where: { id } },
    );
    if (!isUpdateReview[0]) {
      throw new CustomError();
    }
    const updatedReview = await Review.findOne({ where: { id } });
    res.json(updatedReview);
  }
  async updateReview(req, res) {
    const { id } = req.params;
    const { userName, review, bookId, avatar, raiting } = req.body;
    if (!validBodyKeys(reviewBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    const isUpdateReview = await Review.update(
      {
        ...(userName !== undefined && { userName }),
        ...(review !== undefined && { review }),
        ...(bookId !== undefined && { bookId }),
        ...(avatar !== undefined && { avatar }),
        ...(raiting !== undefined && { raiting }),
      },
      { where: { id } },
    );
    if (!isUpdateReview[0]) {
      throw new CustomError();
    }
    const updatedReview = await Review.findOne({ where: { id } });
    res.json(updatedReview);
  }
  async deleteReview(req, res) {
    const { id } = req.params;
    const deletedReview = await Review.destroy({
      where: {
        id,
      },
    });
    if (!deletedReview) {
      throw new CustomError();
    }
    res.send(`Отзыв удален. ID ${id}`);
  }
}

module.exports = new ReviewController();
