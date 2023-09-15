const { DataTypes } = require("sequelize");

module.exports = (sequelizeClient) => {
  const UsersOnRoles = sequelizeClient.define("users_on_roles", {
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: { isInt: true },
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: { isInt: true },
    },
  });

  return UsersOnRoles;
};
