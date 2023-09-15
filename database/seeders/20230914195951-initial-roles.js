"use strict";

const { models } = require("../../src/services/sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const initialRoles = ["Admin", "Customer", "User"];

    for (const role of initialRoles) {
      const initialRole = await models.roles.findOne({ where: { name: role } });

      if (!initialRole) {
        await models.roles.create({ name: role });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
