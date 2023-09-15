"use strict";

const { models } = require("../../src/services/sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userEmail = "test@test.com";

    const user = await models.users.findOne({
      where: { email: userEmail },
      attributes: ["id"],
    });
    const role = await models.roles.findOne({
      where: { name: "Admin" },
      attributes: ["id"],
    });

    if (!user || !role) return;

    const initialUsersOnRoles = await models.users_on_roles.findOne({
      where: { userId: user.id },
    });

    if (initialUsersOnRoles) return;

    await models.users_on_roles.create({
      roleId: role.id,
      userId: user.id,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_on_roles", null, {});
  },
};
