"use strict";

const { models } = require("../../src/services/sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const productName = "testProduct";

    const product = await models.products.findOne({
      where: { name: productName },
      attributes: ["id"],
    });

    if (!product) return;

    await models.product_Images.create({
      productId: product.id,
      imgUrl: "InitialImgUrl",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_Images", null, {});
  },
};
