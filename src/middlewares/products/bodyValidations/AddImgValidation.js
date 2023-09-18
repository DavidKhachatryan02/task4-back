const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const addImgSchema = Joi.object({
  productId: Joi.number().required(),
  imgUrl: Joi.string().required(),
});

const AddImgValidation = (req, res, next) => {
  try {
    const { error } = addImgSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on AddImgValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = { AddImgValidation };
