const { DataTypes } = require("sequelize");

module.exports = (sequelizeClient) => {
  const Roles = sequelizeClient.define("roles", {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  });

  return Roles;
};
