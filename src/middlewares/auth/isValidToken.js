const { InvalidRefreshToken } = require("../../errors/auth");
const { models } = require("../../services/sequelize");

const isValidToken = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.body;

    const user = await models.User.findOne({ where: { refreshToken } });

    if (accessToken !== user.accessToken) {
      return next(new Error("Invalid access token"));
    }

    if (refreshToken !== user.refreshToken) {
      return next(new InvalidRefreshToken());
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isValidToken middleware error => ${e}`
    );
    next(e);
  }
};

module.exports = {
  isValidToken,
};
