const { Sequelize } = require("sequelize");
const { DB_URL } = require("../constants/env");

// Sequelize models
const UserModel = require("../models/users.model");
const RoleModel = require("../models/roles.model");
const UsersOnRolesModel = require("../models/users_on_roles.model");
const CardModel = require("../models/card.model");
const ProductImgModel = require("../models/product_Images.model");
const ProductModel = require("../models/product.model");

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
const Card = CardModel(sequelize);
const Products = ProductModel(sequelize);
const ProductImg = ProductImgModel(sequelize);

// Model associations

User.belongsToMany(Role, {
  through: UsersOnRoles,
  foreignKey: "userId",
});
Role.belongsToMany(User, {
  through: UsersOnRoles,
  foreignKey: "roleId",
});

Products.hasMany(ProductImg, { as: "imgUrl", foreignKey: "productId" });
ProductImg.belongsTo(Products, { foreignKey: "productId" });

Card.belongsTo(Products, { foreignKey: "productId" });
Card.belongsTo(User, { foreignKey: "userId" });
Products.hasMany(Card, { foreignKey: "productId" });
User.hasMany(Card, { foreignKey: "userId" });

module.exports = {
  User,
  Role,
  UsersOnRoles,
  Card,
  Products,
  ProductImg,
};

module.exports = sequelize;
