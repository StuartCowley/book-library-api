const express = require('express');

const { createBookController } = require('../controllers/book');

const bookRouter = express.Router();

bookRouter.route('/').post(createBookController);

module.exports = bookRouter;