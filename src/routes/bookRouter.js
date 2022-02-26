const express = require('express');

const { createBookController, readBooksController } = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(createBookController).get(readBooksController);

module.exports = bookRouter;