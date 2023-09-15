const { DataTypes } = require("sequelize");

module.exports = (sequelizeClient) => {
  const ProductImg = sequelizeClient.define("product_Images", {
    productId: { type: DataTypes.INTEGER, allowNull: false },
    imgUrl: { type: DataTypes.STRING },
  });

  return ProductImg;
};
