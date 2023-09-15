const { models } = require("../../services/sequelize");
const ROLES = require("../../constants/roles");
const { UserHaveRole } = require("../../errors/auth");

const isUserHaveRole = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const roleId = ROLES[await role.toUpperCase()].id;
    const user = await models.users.findOne({ where: { email } });

    const userHaveRole = await models.users_on_roles.findOne({
      where: { userId: user.dataValues.id, roleId },
    });

    if (userHaveRole) {
      return next(new UserHaveRole(email, role));
    }

    req.user = user;
    req.roleId = roleId;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserHaveRole middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = {
  isUserHaveRole,
};
