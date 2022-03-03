const express = require('express');

const genreRouter = express.Router();

genreRouter.route('/');

genreRouter.route('/:id');

module.exports = genreRouter;