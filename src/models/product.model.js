const { DataTypes } = require("sequelize");

module.exports = (sequelizeClient) => {
  const Products = sequelizeClient.define("products", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING },
  });

  return Products;
};
