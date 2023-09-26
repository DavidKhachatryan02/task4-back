const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const deleteSchema = Joi.object({
  productId: Joi.number().required(),
});

const DeleteItemValidation = (req, res, next) => {
  try {
    const { error } = deleteSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on productValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = DeleteItemValidation;
