const express = require('express');

const { createBook, readBooks, getBookById, updateBook } = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(createBook).get(readBooks);

bookRouter.route('/:id').get(getBookById).patch(updateBook);

module.exports = bookRouter;