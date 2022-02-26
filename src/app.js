const express = require('express');

const { createReaderController, readReadersController, getReaderById } = require('./controllers/reader');

const app = express();

app.use(express.json());

app.post('/readers', createReaderController);
app.get('/readers', readReadersController);
app.get('/readers/:id', getReaderById);
// app.patch('/readers/:id', updateReader);

module.exports = app;