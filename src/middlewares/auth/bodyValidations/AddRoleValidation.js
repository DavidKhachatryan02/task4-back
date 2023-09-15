const Joi = require("joi");
const { InvalidBody } = require("../../../errors/validation");

const addRoleSchema = Joi.object({
  email: Joi.string().required().email(),
  role: Joi.string().required(),
});

const AddRoleValidation = (req, res, next) => {
  try {
    const { error } = addRoleSchema.validate(req.body);

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

module.exports = { AddRoleValidation };
