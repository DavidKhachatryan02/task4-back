"use strict";

const { models } = require("../../src/services/sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userEmail = "test@test.com";
    const productName = "testProduct";

    const user = await models.users.findOne({
      where: { email: userEmail },
      attributes: ["id"],
    });
    const product = await models.products.findOne({
      where: { name: productName },
      attributes: ["id"],
    });

    if (!user || !product) return;

    const initialCard = await models.card.findOne({
      where: { userId: user.id },
    });

    if (initialCard) return;

    await models.card.create({
      productId: product.id,
      userId: user.id,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("card", null, {});
  },
};
