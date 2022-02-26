const express = require('express');
const { Book } = require('../models');

const createBookController = async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json(newBook);
};

const readBooksController = async (req, res) => {
  const books = await Book.findAll();
  res.status(200).json(books);
}

module.exports = { createBookController, readBooksController };