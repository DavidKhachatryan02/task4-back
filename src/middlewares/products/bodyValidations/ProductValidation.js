const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

const ProductValidation = (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on productValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = ProductValidation;
