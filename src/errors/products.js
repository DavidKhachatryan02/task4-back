class ProductNotFound extends Error {
  constructor() {
    super("Product is not found");
  }
}

module.exports = { ProductNotFound };
