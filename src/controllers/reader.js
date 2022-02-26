const { Reader } = require('../models');

const createReaderController = async (req, res) => {
    const newReader = await Reader.create(req.body);
    res.status(201).json(newReader);
};

const readReadersController = async (req, res) => {
    const readers = await Reader.findAll();
    res.status(200).json(readers);
};

const getReaderById = async (req, res) => {
    const readerId = req.params.id;
    const reader = await Reader.findByPk(readerId);

    if (!reader) {
        res.status(404).json({ error: 'The reader could not be found.'});
    } else {
        res.status(200).json(reader);
    }
};

// const updateReader = async (req, res) => {};

module.exports = { createReaderController, readReadersController, getReaderById };