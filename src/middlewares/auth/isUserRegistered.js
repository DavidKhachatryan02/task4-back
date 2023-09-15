const { UserExists } = require("../../errors/auth");
const { models } = require("../../services/sequelize");

const isUserRegistered = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await models.users.findOne({ where: { email } });
    if (user) {
      return next(new UserExists(email));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserRegistered middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = {
  isUserRegistered,
};
