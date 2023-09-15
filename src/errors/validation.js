class InvalidBody extends Error {
  constructor(error) {
    super(`Body validation error: ${error}`);
  }
}

module.exports = { InvalidBody };
