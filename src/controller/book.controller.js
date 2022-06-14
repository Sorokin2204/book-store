const db = require('../models');
const { CustomError, TypeError } = require('../models/customError.model');
const validBodyKeys = require('../utils/validBodyKeys');
const Book = db.books;
const bookBodyProps = ['title', 'published', 'authorId', 'genre', 'annotation', 'picture', 'amount', 'type', 'likes'];
class BookController {
  async createBook(req, res) {
    const { title, published, authorId, genre, annotation, picture, amount, type, likes = 0 } = req.body;
    if (!validBodyKeys(bookBodyProps, req.body)) {
      throw new CustomError(400, TypeError.BODY_NOT_VALID);
    }
    const newBook = await Book.create({
      title,
      published,
      authorId,
      genre,
      annotation,
      picture,
      amount,
      type,
      likes,
    });
    res.json(newBook);
  }

  async getBooks(req, res) {
    const books = await Book.findAll({ order: [['createdAt', 'DESC']] });
    res.json(books);
  }

  async getBookById(req, res) {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    res.json(book);
  }
  async getBooksByAuthor(req, res) {
    const { id } = req.params;
    const booksByAuthor = await Book.findAll({ where: { authorId: id } });
    res.json(booksByAuthor);
  }

  async updateAllBook(req, res) {
    const { id } = req.params;
    const { title, published, authorId, genre, annotation, picture, amount, type, likes = 0 } = req.body;
    if (!validBodyKeys(bookBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    const isUpdateBook = await Book.update(
      {
        title,
        published,
        authorId,
        genre,
        annotation,
        picture,
        amount,
        type,
        likes,
      },
      { where: { id } },
    );
    if (!isUpdateBook[0]) {
      throw new CustomError();
    }
    const updatedBook = await Book.findOne({ where: { id } });
    res.json(updatedBook);
  }
  async updateBook(req, res) {
    const { id } = req.params;
    const { title, published, authorId, genre, annotation, picture, amount, type, likes = 0 } = req.body;
    if (!validBodyKeys(bookBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    const isUpdateBook = await Book.update(
      {
        ...(title !== undefined && { title }),
        ...(published !== undefined && { published }),
        ...(authorId !== undefined && { authorId }),
        ...(genre !== undefined && { genre }),
        ...(annotation !== undefined && { annotation }),
        ...(picture !== undefined && { picture }),
        ...(amount !== undefined && { amount }),
        ...(type !== undefined && { type }),
        ...(likes !== undefined && { likes }),
      },
      { where: { id } },
    );
    if (!isUpdateBook[0]) {
      throw new CustomError();
    }
    const updatedBook = await Book.findOne({ where: { id } });
    res.json(updatedBook);
  }
  async deleteBook(req, res) {
    const { id } = req.params;
    const deletedBook = await Book.destroy({
      where: {
        id,
      },
    });
    if (!deletedBook) {
      throw new CustomError();
    }
    res.send(`Книга удалена. ID ${id}`);
  }
}

module.exports = new BookController();
