const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
  accessToken: Joi.string().required(),
});

const RefreshValidation = (req, res, next) => {
  try {
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on RefreshValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = RefreshValidation;
