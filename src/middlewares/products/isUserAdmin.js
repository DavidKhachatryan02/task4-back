const ROLES = require("../../constants/roles");
const { IsNotAdmin, UserNotExists } = require("../../errors/auth");
const { models } = require("../../services/sequelize");

const isUserAdmin = async (req, res, next) => {
  try {
    const email = req.user.data;
    const user = await models.users.findOne({
      where: { email },
      include: {
        model: models.roles,
      },
    });

    if (!user) {
      return next(new UserNotExists(email));
    }

    const userRoles = user.roles.map((role) => role.id);

    if (!userRoles.includes(ROLES.ADMIN.id)) {
      return next(new IsNotAdmin());
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserAdmin middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = {
  isUserAdmin,
};
