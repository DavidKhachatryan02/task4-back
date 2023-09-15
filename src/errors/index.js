const {
  InvalidCredentialsError,
  UserNotExists,
  UnAuthorizedError,
  InvalidRefreshToken,
  UserExists,
  NoSuchRole,
  UserHaveRole,
} = require("./auth");
const InvalidBody = require("./validation");

const errorHandler = (error, req, res, next) => {
  if (error) {
    switch (error.constructor) {
      case UserHaveRole:
        res.status(400).json({ message: error.message });
        break;
      case InvalidBody:
        res.status(400).json({ message: error.message });
        break;
      case NoSuchRole:
        res.status(400).json({ message: error.message });
        break;
      case UserNotExists:
        res.status(400).json({ message: error.message });
        break;
      case UserExists:
        res.status(400).json({ message: error.message });
        break;
      case UnAuthorizedError:
        res.status(401).json({ message: error.message });
        break;
      case InvalidCredentialsError:
        res.status(403).json({ message: error.message });
        break;
      case InvalidRefreshToken:
        res.status(400).json({ message: error.message });
        break;
      default:
        res.status(500).json({ message: error.message });
    }

    return;
  }

  next(null);
};

module.exports = { errorHandler };