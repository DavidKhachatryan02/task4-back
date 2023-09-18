const { ImgAlreadyAdded } = require("../../errors/products");
const { models } = require("../../services/sequelize");

const isImgAdded = async (req, res, next) => {
  try {
    const { productId, imgUrl } = req.body;

    const imgAdded = await models.product_Images.findOne({
      where: { productId, imgUrl },
    });

    if (imgAdded) {
      return next(new ImgAlreadyAdded());
    }
    next();
  } catch (e) {
    console.error(`[middleware]: Error on isImgAdded middleware error => ${e}`);
    next(e);
  }
};

module.exports = { isImgAdded };
