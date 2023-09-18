const { models } = require("../../services/sequelize");
const ROLES = require("../../constants/roles");
const { UserHaveRole } = require("../../errors/auth");

const isUserHaveRole = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const roleId = ROLES[await role.toUpperCase()].id;
    const user = await models.users.findOne({
      where: { email },
      include: {
        model: models.roles,
      },
    });

    const userRoles = user.roles.map((role) => role.id);

    if (userRoles.includes(roleId)) {
      return next(
        new UserHaveRole(email, ROLES[await role.toUpperCase()].name)
      );
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
