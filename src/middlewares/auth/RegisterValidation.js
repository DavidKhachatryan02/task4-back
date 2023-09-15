const Joi = require("joi");
const { InvalidBody } = require("../../errors/validation");

const RegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  userRole: Joi.string().required(),
});

const RegisterValidation = (req, res, next) => {
  try {
    const { error } = RegisterSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on RegisterValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = { RegisterValidation };
