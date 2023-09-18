const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const addToCardSchema = Joi.object({
  productId: Joi.number().required(),
  userId: Joi.number().required(),
});

const AddToCardValidation = (req, res, next) => {
  try {
    const { error } = addToCardSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on AddToCardValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = { AddToCardValidation };