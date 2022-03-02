const express = require('express');
const { Book } = require('../models');
const { createItem, getAllItems, getItemById, updateItemById } = require('./helpers');

const createBook = (req, res) => createItem(res, 'book', req.body);

const readBooks = (_, res) => getAllItems(res, 'book');

const getBookById = (req, res) => getItemById(res, 'book', req.params.id);

const updateBook = (req, res) => updateItemById(res, 'book', req.body, req.params.id)

const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  const deletedRows = await Book.destroy({ where: { id: bookId } });

  if (!deletedRows) {
    res.status(404).json({ error:'The book could not be found.'  });
  } else {
    res.status(204).send();
  }
};

module.exports = { createBook, readBooks, getBookById, updateBook, deleteBook };