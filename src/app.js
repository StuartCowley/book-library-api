const express = require('express');

const { createReaderController, readReadersController, getReaderById, updateReader, deleteReader } = require('./controllers/reader');

const app = express();

app.use(express.json());

app.post('/readers', createReaderController);
app.get('/readers', readReadersController);
app.get('/readers/:id', getReaderById);
app.patch('/readers/:id', updateReader);
app.delete('/readers/:id', deleteReader);

module.exports = app;