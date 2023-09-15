const { Sequelize } = require("sequelize");
const { DB_URL } = require("../constants/env");

// Sequelize models
const UserModel = require("../models/users.model");
const RoleModel = require("../models/roles.model");
const UsersOnRolesModel = require("../models/users_on_roles.model");

const config = {
  logging: false,
  dialect: "postgres",
  define: { freezeTableName: true },
};

const sequelize = new Sequelize(DB_URL, config);

// Model initiations
const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const UsersOnRoles = UsersOnRolesModel(sequelize);

// Model associations

User.belongsToMany(Role, {
  through: UsersOnRoles,
  foreignKey: "userId",
});

Role.belongsToMany(User, {
  through: UsersOnRoles,
  foreignKey: "roleId",
});

module.exports = {
  User,
  Role,
  UsersOnRoles,
};

module.exports = sequelize;
