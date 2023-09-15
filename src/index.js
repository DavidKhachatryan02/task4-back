const app = require("./app");
const sequelize = require("./services/sequelize");

const APP_PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await sequelize.authenticate();
    app.listen(APP_PORT, () => {
      console.log(
        `[server]: Server is running at http://localhost:${APP_PORT}`
      );
    });
  } catch (e) {
    await sequelize.close();
    console.error(`[server]: Error on initializing server => ${e}`);
  }
};

main().then();
