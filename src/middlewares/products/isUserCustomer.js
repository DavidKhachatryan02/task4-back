const ROLES = require("../../constants/roles");
const { UserNotExists, IsNotCustomer } = require("../../errors/auth");
const { models } = require("../../services/sequelize");

const isUserCustomer = async (req, res, next) => {
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

    if (!userRoles.includes(ROLES.CUSTOMER.id)) {
      return next(new IsNotCustomer());
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserCustomer middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = {
  isUserCustomer,
};
