const { models } = require("../services/sequelize");

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await models.products.create({
      name,
      description,
      price,
    });
    res.status(201).json(newProduct);
    next(null);
  } catch (e) {
    next(e);
  }
};

const editProduct = async (req, res, next) => {
  try {
    const { productId, name, description, price } = req.body;
    const product = await models.products.findOne({
      where: {
        id: productId,
      },
    });

    // if(!product){
    //   return next(new Product Not foun ERROR)
    // }

    product.set({
      name: name ?? product.dataValues.name,
      description: description ?? product.dataValues.description,
      price: price ?? product.dataValues.price,
    });

    await product.save();

    res.status(201).json(product);
    next(null);
  } catch (e) {
    next(e);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.body.productId;
    await models.products.destroy({
      where: {
        id,
      },
    });
    res.status(201).send(`product with ID-${id} is deleted`);
    next(null);
  } catch (e) {
    next(e);
  }
};

const addToCard = async (req, res, next) => {
  try {
    next(null);
  } catch (e) {
    next(e);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    next(null);
  } catch (e) {
    next(e);
  }
};

const addImg = async (req, res, next) => {
  try {
    next(null);
  } catch (e) {
    next(e);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await models.products.findAll();

    res.status(201).json(products);
    next(null);
  } catch (e) {
    next(e);
  }
};

const getProductInfo = async (req, res, next) => {
  try {
    next(null);
  } catch (e) {
    next(e);
  }
};

const getUserCard = async (req, res, next) => {
  try {
    next(null);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  addToCard,
  removeProduct,
  addImg,
  getAllProducts,
  getProductInfo,
  getUserCard,
};
