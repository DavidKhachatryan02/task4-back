const express = require("express");
const request = require("supertest");
const productsRouter = require("../routes/productRoutes");
const authRouter = require("../routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/products", productsRouter);
app.use("/auth", authRouter);

const testUserData = {
  email: "testUserProducts@test.com",
  name: "TestUserName",
  password: "TestPassword1",
  userRole: "admin",
};

const newProduct = {
  name: "Test Product",
  description: "Test description",
  price: 10.99,
};

let accessToken;
let productId;

describe("Products API Routes", () => {
  beforeAll(async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(testUserData);
    accessToken = response.body.accessToken;
  });

  afterAll(async () => {
    await request(app)
      .post("/auth/deleteUser")
      .send({ email: testUserData.email });
    await request(app).post("/products/deleteProduct").send(productId);
  });

  it("should add a new product", async () => {
    const response = await request(app)
      .post("/products/addproduct")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newProduct)
     // .expect(201);
    console.log( response.text);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
    expect(response.body.price).toBe(newProduct.price);
  });

  it("should get product details by ID", async () => {
    const product = await request(app)
      .post("/products/addProduct")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newProduct);
    productId = newProduct.id;
    const response = await request(app)
      .get(`products/getProductInfo/${product.id}`)
      .expect(200);

    expect(response.body.name).toBe(product.name);
    expect(response.body.description).toBe(product.description);
    expect(response.body.price).toBe(product.price);
  });

  it("should return 404 when product ID is invalid", async () => {
    await request(app).get("/api/products/invalid-id").expect(404);
  });
});
