const express = require('express');
const { createReaderController, readReadersController, getReaderById, updateReader, deleteReader } = require('../controllers/reader');

const readerRouter = express.Router();

readerRouter.route('/').post(createReaderController).get(readReadersController);

readerRouter.route('/:id').get(getReaderById).patch(updateReader).delete(deleteReader);

module.exports = readerRouter;
