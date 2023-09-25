"use strict";
const { models } = require("../../src/services/sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const initialProduct = await models.products.findOne({
      where: {
        name: "testProduct",
      },
    });

    if (initialProduct) return;

    await models.products.create({
      name: "testProduct",
      description: "Test product description",
      price: 123,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
