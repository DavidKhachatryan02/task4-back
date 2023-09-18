const { ProductNotFound } = require("../errors/products");
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

    if (!product) {
      return next(new ProductNotFound());
    }

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

const addImg = async (req, res, next) => {
  try {
    const { productId, imgUrl } = req.body;
    await models.product_Images.create({
      productId,
      imgUrl,
    });
    res.status(201).send(`img ${imgUrl} added to product ${productId}`);
    next(null);
  } catch (e) {
    next(e);
  }
};

const removeImg = async (req, res, next) => {
  try {
    const id = req.body.imgId;
    const { productId } = req.body;

    await models.product_Images.destroy({
      where: {
        id,
        productId,
      },
    });
    res
      .status(201)
      .send(`img ${id} is deleted from product with ID-${productId} `);
    // res.status(201).send(`img ${imgUrl} added to product ${productId}`);
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

const removeProductFromCard = async (req, res, next) => {
  try {
    next(null);
  } catch (e) {
    next(e);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await models.products.findAll({
      include: [
        {
          model: models.product_Images,
          as: "imgUrl",
        },
      ],
    });

    const formedProducts = products.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      img: item.imgUrl.map((img) => ({
        imgUrl: img.imgUrl,
        imgId: img.id,
      })),
    }));

    res.status(201).json(formedProducts);
    next(null);
  } catch (e) {
    next(e);
  }
};

const getProductInfo = async (req, res, next) => {
  try {
    const id = parseInt(req.query.id);

    const product = await models.products.findOne({
      where: { id },
      include: [
        {
          model: models.product_Images,
          as: "imgUrl",
        },
      ],
    });

    if (!product) {
      return next(new ProductNotFound());
    }

    product.dataValues.img = product.imgUrl.map((item) => ({
      imgUrl: item.imgUrl,
      imgId: item.id,
    }));

    delete product.dataValues.imgUrl;
    res.status(201).json(product.dataValues);
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
  removeImg,
  editProduct,
  deleteProduct,
  addToCard,
  removeProductFromCard,
  addImg,
  getAllProducts,
  getProductInfo,
  getUserCard,
};
