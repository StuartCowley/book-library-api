const express = require('express');

const { createReaderController } = require('./controllers/reader');

const app = express();

app.use(express.json());

app.post('/readers', createReaderController);

module.exports = app;