const express = require('express');
const { Book } = require('../models');

const createBookController = async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
};

module.exports = { createBookController };