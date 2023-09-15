const Joi = require("joi");
const { InvalidBody } = require("../../errors/validation");

const refreshSchema = Joi.object({
  email: Joi.string().required().email(),
  role: Joi.string().required(),
});

const addRoleValidation = (req, res, next) => {
  try {
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on addRoleValidation middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = { addRoleValidation };
