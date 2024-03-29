class UserNotExists extends Error {
  constructor(email) {
    super(`User with ${email} not found`);
  }
}

class UserExists extends Error {
  constructor(email) {
    super(`User with ${email} already exists`);
  }
}

class UserHaveRole extends Error {
  constructor(email, role) {
    super(`User with ${email} already have role ${role}`);
  }
}

class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid Code");
  }
}

class NoSuchRole extends Error {
  constructor() {
    super("There is no such role");
  }
}

class UnAuthorizedError extends Error {
  constructor() {
    super("No auth token provided");
  }
}

class IsNotAdmin extends Error {
  constructor() {
    super("You are not Admin, Dont have permisson");
  }
}

class IsNotCustomer extends Error {
  constructor() {
    super("You are not Customer, you cant add to card");
  }
}

class InvalidRefreshToken extends Error {
  constructor() {
    super("Refresh token is invalid");
  }
}

class InvalidAccessToken extends Error {
  constructor() {
    super("Access Token token is invalid");
  }
}

module.exports = {
  UserHaveRole,
  InvalidAccessToken,
  IsNotAdmin,
  UserExists,
  NoSuchRole,
  InvalidRefreshToken,
  UnAuthorizedError,
  InvalidCredentialsError,
  UserNotExists,
  IsNotCustomer,
};
