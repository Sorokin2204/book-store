const db = require('../models');
const { CustomError, TypeError } = require('../models/customError.model');
const validBodyKeys = require('../utils/validBodyKeys');
const Author = db.authors;

const authorBodyProps = ['firstName', 'lastName', 'photo', 'dateOfBirth', 'about'];

class AuthorController {
  async createAuthor(req, res) {
    const { firstName, lastName, photo, dateOfBirth, about } = req.body;
    const newAuthor = await Author.create({
      firstName,
      lastName,
      photo,
      dateOfBirth,
      about,
    });
    if (!validBodyKeys(authorBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    res.json(newAuthor);
  }

  async getAuthors(req, res) {
    const authors = await Author.findAll({ order: [['firstName', 'DESC']] });
    res.json(authors);
  }

  async getAuthorById(req, res) {
    const { id } = req.params;
    const author = await Author.findOne({ where: { id } });
    res.json(author);
  }

  async updateAllAuthor(req, res) {
    const { id } = req.params;
    const { firstName, lastName, photo, dateOfBirth, about } = req.body;
    if (!validBodyKeys(authorBodyProps, req.body)) {
      throw new CustomError(500, TypeError.BODY_NOT_VALID);
    }
    const isUpdateAuthor = await Author.update(
      {
        firstName,
        lastName,
        photo,
        dateOfBirth,
        about,
      },
      { where: { id } },
    );
    if (!isUpdateAuthor[0]) {
      throw new CustomError();
    }
    const updatedAuthor = await Author.findOne({ where: { id } });
    res.json(updatedAuthor);
  }
  async updateAuthor(req, res) {
    const { id } = req.params;
    const { firstName, lastName, photo, dateOfBirth, about } = req.body;
    if (!validBodyKeys(authorBodyProps, req.body)) {
      throw new CustomError(500, { error: TypeError.BODY_NOT_VALID, bugID: 'Баг найден, необходимо сообщить разработчику. ID 12568124' });
    }
    const isUpdateAuthor = await Author.update(
      {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(photo !== undefined && { photo }),
        ...(dateOfBirth !== undefined && { dateOfBirth }),
        ...(about !== undefined && { about }),
      },
      { where: { id } },
    );
    if (!isUpdateAuthor[0]) {
      throw new CustomError();
    }
    const updatedAuthor = await Author.findOne({ where: { id } });
    res.json(updatedAuthor);
  }
  async deleteAuthor(req, res) {
    const { id } = req.params;
    const deletedAuthor = await Author.destroy({
      where: {
        id,
      },
    });
    if (!deletedAuthor) {
      throw new CustomError();
    }
    res.send(`Автор удален. ID ${id}`);
  }
}

module.exports = new AuthorController();
