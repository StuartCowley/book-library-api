const express = require('express');

const { createBookController, readBooksController, getBookById } = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(createBookController).get(readBooksController);

bookRouter.route('/:id').get(getBookById);

module.exports = bookRouter;