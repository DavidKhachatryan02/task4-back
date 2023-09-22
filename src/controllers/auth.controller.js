const { JWT_EXPIRE_TIME, BCRYPT_SALT_ROUNDS } = require("../constants/config");
const ROLES = require("../constants/roles");
const { compare, hash } = require("bcrypt");
const {
  generateToken,
  generateRefreshToken,
  verifyAuthToken,
} = require("../utils");
const { InvalidCredentialsError, NoSuchRole } = require("../errors/auth");

const { models } = require("../services/sequelize");

const getMe = async (req, res, next) => {
  try {
    const email = req.user.data;

    const userData = await models.users.findOne({
      where: { email },
      attributes: { exclude: ["password", "refreshToken", "accessToken"] },
      include: {
        model: models.roles,
      },
    });

    const userRoles = userData.roles.map((role) => role.name);

    const { roles, ...user } = userData.dataValues;

    user.roles = userRoles;

    res.status(200).json(user);

    next(null);
  } catch (e) {
    next(e);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, name, userRole } = req.body;
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    const refreshToken = generateRefreshToken();
    const accessToken = generateToken(email);

    const roleId = ROLES[await userRole.toUpperCase()].id;

    const role = await models.roles.findOne({ where: { id: roleId } });

    if (!role) {
      return next(new NoSuchRole());
    }

    const user = await models.users.create({
      email,
      name,
      refreshToken,
      accessToken,
      password: hashedPassword,
    });

    await models.users_on_roles.create({
      userId: user.dataValues.id,
      roleId: role.dataValues.id,
    });

    res
      .status(200)
      .json({ refreshToken, accessToken, ExpireTime: JWT_EXPIRE_TIME });
    next(null);
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.user;

    const userPassword = req.body.password;

    if (await compare(password, userPassword)) {
      return next(new InvalidCredentialsError());
    }

    const accessToken = generateToken(email);

    await models.users.update({ accessToken }, { where: { email } });

    res.status(200).json({
      accessToken,
      refreshToken: req.user.refreshToken,
      ExpireTime: JWT_EXPIRE_TIME,
    });

    next(null);
  } catch (e) {
    console.error(`login error ${e}`);
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.user.dataValues;

    const newAccessToken = generateToken(email);

    await models.users.update(
      { accessToken: newAccessToken },
      { where: { email } }
    );

    res.status(200).json({
      refreshToken,
      accessToken: newAccessToken,
      ExpireTime: JWT_EXPIRE_TIME,
    });

    next(null);
  } catch (e) {
    console.error(`Registration error ${e}`);
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const email = verifyAuthToken(accessToken).data;
    await models.users.update({ accessToken: null }, { where: { email } });
    res.status(200).end();
    next(null);
  } catch (e) {
    next(e);
  }
};

const addRoleToUser = async (req, res, next) => {
  try {
    const { role, email } = req.body;

    const roleId = ROLES[await role.toUpperCase()].id;

    const userRole = await models.roles.findOne({ where: { id: roleId } });

    if (!userRole) {
      return next(new NoSuchRole());
    }

    const user = await models.users.findOne({ where: { email } });

    await models.users_on_roles.create({
      userId: user.dataValues.id,
      roleId: userRole.dataValues.id,
    });

    res
      .status(200)
      .send(`Role ${userRole.dataValues.name} is Added to user ${email}`);

    next(null);
  } catch (e) {
    console.error(`addRole error ${e}`);
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    await models.users.destroy({
      where: {
        email,
      },
      force: true,
    });
    res.status(200).send(`User with email ${email} is deleted`);

    next(null);
  } catch (e) {
    console.error(`deleteUser error ${e}`);
    next(e);
  }
};

module.exports = {
  deleteUser,
  getMe,
  login,
  refreshToken,
  register,
  logout,
  addRoleToUser,
};
