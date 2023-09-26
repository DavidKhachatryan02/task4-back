const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const editProduct = Joi.object({
  productId: Joi.number().required(),
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
});

const EditProductValidation = (req, res, next) => {
  try {
    const { error } = editProduct.validate(req.body);

    if (error) {
      return next(new InvalidBody(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on EditProductValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = EditProductValidation;
