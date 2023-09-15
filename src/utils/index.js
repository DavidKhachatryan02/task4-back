const jwt = require("jsonwebtoken");
const { JWT_EXPIRE_TIME, JWT_SECRET_KEY } = require("../constants/config");

const generateToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME,
  });
};

const verifyAuthToken = (accessToken) => {
  return jwt.verify(accessToken, JWT_SECRET_KEY);
};

const generateRefreshToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

module.exports = { generateToken, verifyAuthToken, generateRefreshToken };
