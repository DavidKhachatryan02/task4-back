"use strict";
const { hash } = require("bcrypt");
const { models } = require("../../src/services/sequelize");
const { BCRYPT_SALT_ROUNDS } = require("../../src/constants/config");
const { generateToken, generateRefreshToken } = require("../../src/utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const initialUser = await models.users.findOne({
      where: {
        email: "test@test.com",
      },
    });

    if (initialUser) return;

    const passwordHash = await hash("Password1*", BCRYPT_SALT_ROUNDS);
    const accessToken = generateToken("test@test.com");
    const refreshToken = generateRefreshToken();

    await models.users.create({
      name: "test-user",
      email: "test@test.com",
      password: passwordHash,
      accessToken,
      refreshToken,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
