const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const removeImgSchema = Joi.object({
  productId: Joi.number().required(),
  imgId: Joi.number().required(),
});

const RemoveImgValidation = (req, res, next) => {
  try {
    const { error } = removeImgSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on RemoveImgValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = RemoveImgValidation;
