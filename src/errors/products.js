class ProductNotFound extends Error {
  constructor() {
    super("Product is not found");
  }
}

class ImgAlreadyAdded extends Error {
  constructor() {
    super("Image is already added to product");
  }
}

module.exports = { ProductNotFound, ImgAlreadyAdded };
