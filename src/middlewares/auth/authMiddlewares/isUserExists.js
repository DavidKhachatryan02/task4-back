const { UserNotExists } = require("../../../errors/auth");
const { models } = require("../../../services/sequelize");

const isUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await models.users.findOne({ where: { email } });

    if (!user) {
      return next(new UserNotExists(email));
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserExists middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = isUserExists;
