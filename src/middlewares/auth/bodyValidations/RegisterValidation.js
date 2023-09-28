const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  userRole: Joi.string().required(),
});

const RegisterValidation = (req, res, next) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on RegisterValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = RegisterValidation;
