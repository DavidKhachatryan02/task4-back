const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DATABASE_URL;

module.exports = {
  DB_URL,
};
