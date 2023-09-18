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

class ImgNotExists extends Error {
  constructor() {
    super("Image not Exists");
  }
}

module.exports = { ProductNotFound, ImgAlreadyAdded, ImgNotExists };
