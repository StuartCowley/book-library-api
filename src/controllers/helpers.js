const {Book, Reader } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.`});

const getModel = (model) => {
    const models = {
        book: Book,
        reader: Reader,
    };

    return models[model];
};

const removePassword = (obj) => {
    if (obj.hasOwnProperty('password')) {
      delete obj.password;
    }
  
    return obj;
  };

  const createItem = async (res, model, item) => {
    const Model = getModel(model);
  
    try {
      const newItem = await Model.create(item);
      const itemWithoutPassword = removePassword(newItem.get());
    
      res.status(201).json(itemWithoutPassword);
    } catch (error) {
      const errorMessages = error.errors.map((e) => e.message);
  
      res.status(400).json({ errors: errorMessages });
    }
};

const getAllItems = async (res, model) => {
    const Model = getModel(model);

    const items = await Model.findAll({})
    
    const itemsWithoutPassword = items.map((item) => {
      return removePassword(item.get());
    });

    res.status(200).json(itemsWithoutPassword);
};

const getItemById = async (res, model, id) => {
    const Model = getModel(model);

    const item = await Model.findByPk(id);

    if (!item) {
        res.status(404).json(get404Error(model))
      } else {
        res.status(200).json(item);
      }

}


module.exports = {
    createItem, 
    getAllItems,
    getItemById
};
