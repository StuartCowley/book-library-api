const express = require('express');
const { Book } = require('../models');

const createBookController = async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
};

const readBooksController = async (req, res) => {
  const books = await Book.findAll();
  res.status(200).json(books);
};

const getBookById = async (req, res) => {
  const bookId = req.params.id;
  const book = await Book.findByPk(bookId);

  if (!book) {
    res.status(404).json({ error: 'The book could not be found.' })
  } else {
    res.status(200).json(book);
  }
};

module.exports = { createBookController, readBooksController, getBookById };