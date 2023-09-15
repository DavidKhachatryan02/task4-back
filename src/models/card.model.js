const { DataTypes } = require("sequelize");

module.exports = (sequelizeClient) => {
  const Card = sequelizeClient.define("card", {
    productId: { type: DataTypes.INTEGER},
    userId: { type: DataTypes.INTEGER },
  });

  return Card;
};
