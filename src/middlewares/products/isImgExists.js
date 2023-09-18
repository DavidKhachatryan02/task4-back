const { ImgNotExists } = require("../../errors/products");
const { models } = require("../../services/sequelize");

const isImgExists = async (req, res, next) => {
  try {
    const { productId, imgId } = req.body;

    const isImg = await models.product_Images.findOne({
      where: { productId, id: imgId },
    });

    if (!isImg) {
      return next(new ImgNotExists());
    }
    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on imImgExists middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = { isImgExists };
