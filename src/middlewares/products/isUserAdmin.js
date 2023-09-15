const ROLES = require("../../constants/roles");
const { UnAuthorizedError, UserNotExists } = require("../../errors/auth");
const { models } = require("../../services/sequelize");

const isUserAdmin = async (req, res, next) => {
  try {
    const email = req.user.data;
    const user = await models.users.findOne({ where: { email } });
    if (!user) {
      return next(new UserNotExists(email));
    }
    const userId = user.dataValues.id;
    const userIsAdmin = await models.users_on_roles.findOne({
      where: { userId, roleId: ROLES.ADMIN.id },
    });

    if (!userIsAdmin) {
      //! WRITE ERROR
      return next(new UnAuthorizedError(error));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserAdmin middleware error => ${e}`
    );

    next(new UnAuthorizedError());
  }
};

module.exports = {
  isUserAdmin,
};
