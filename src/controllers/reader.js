const express = require('express');
const { Reader } = require('../models');
const { createItem, getAllItems, getItemById, updateItemById } = require('./helpers');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const readReaders = (_, res) => getAllItems(res, 'reader');

const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);

const updateReader = (req, res) => updateItemById(res, 'reader', req.body, req.params.id)

const deleteReader = async (req, res) => {
    const readerId = req.params.id;
    const deletedRows = await Reader.destroy({ where: { id: readerId } });

    if (!deletedRows) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
    res.status(204).send();
    }
};

module.exports = { createReader, readReaders, getReaderById, updateReader, deleteReader };