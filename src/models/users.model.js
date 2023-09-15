const { DataTypes } = require("sequelize");

module.exports = (sequelizeClient) => {
  const User = sequelizeClient.define("users", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.STRING },
    accessToken: { type: DataTypes.STRING },
  });

  return User;
};
