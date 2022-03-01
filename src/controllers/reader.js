const express = require('express');
const { Reader } = require('../models');
const { createItem, getAllItems, getItemById } = require('./helpers');

const createReader = (req, res) => createItem(res, 'reader', req.body);

const readReaders = (_, res) => getAllItems(res, 'reader');

const getReaderById = (req, res) => getItemById(res, 'reader', req.params.id);

const updateReader = async (req, res) => {
    const readerId = req.params.id;
    const updateData = req.body;

    const [ updatedRows ] = await Reader.update(updateData, { where : {id: readerId } });

    if (!updatedRows) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
    res.status(200).send();
    }
};

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