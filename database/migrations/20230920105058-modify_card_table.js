"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("card", "quantity", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.removeColumn("card", "quantity")]);
  },
};
