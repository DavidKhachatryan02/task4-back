const { UnAuthorizedError } = require("../../../errors/auth");
const { verifyAuthToken } = require("../../../utils");

const isUserAuthorized = async (req, res, next) => {
  try {
    const headersAuth = req.headers.authorization;

    if (!headersAuth) {
      return next(new UnAuthorizedError());
    }

    const accessToken = headersAuth.replace("Bearer ", "");
    const payload = verifyAuthToken(accessToken);

    if (!payload) {
      return next(new UnAuthorizedError());
    }

    req.user = payload;
    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserAuthorized middleware error => ${e}`
    );

    next(new UnAuthorizedError());
  }
};

module.exports = isUserAuthorized;
