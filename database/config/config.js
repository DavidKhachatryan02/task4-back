const { DB_URL } = require("../../src/constants/env");

const env = process.env.NODE_ENV || "development";
const dialect = "postgres";

module.exports = {
  [env]: {
    dialect,
    url: DB_URL,
    migrationStorageTableName: "_migrations",
  },
};
