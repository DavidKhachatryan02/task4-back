const express = require("express");
const request = require("supertest");
const productsRouter = require("../routes/productRoutes");
const authRouter = require("../routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/products", productsRouter);
app.use("/auth", authRouter);

const AdminUser = {
  email: "testUserAdmin@test.com",
  name: "TestUserName",
  password: "TestPassword1",
  userRole: "admin",
};

const CustomerUser = {
  email: "testUserCustomern@test.com",
  name: "TestUserName",
  password: "TestPassword1",
  userRole: "Customer",
};

const newProduct = {
  name: "Test Product",
  description: "Test description",
  price: 10,
};

let adminAccessToken;
let customerAccessToken;
let productId;

describe("CARD API ROUTES", () => {
  beforeAll(async () => {
    const adminUser = await request(app).post("/auth/register").send(AdminUser);
    adminAccessToken = adminUser.body.accessToken;
  });

  beforeAll(async () => {
    const customerUser = await request(app)
      .post("/auth/register")
      .send(CustomerUser);
    customerAccessToken = customerUser.body.accessToken;
  });

  beforeAll(async () => {
    const product = await request(app)
      .post("/products/addProduct")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send(newProduct)
      .expect(201);
    productId = product.body.id;
  });

  afterAll(async () => {
    await request(app)
      .post("/products/deleteProduct")
      .set("Authorization", `Bearer ${adminAccessToken}`)
      .send({ productId: productId });
  });

  afterAll(async () => {
    await request(app)
      .post("/auth/deleteUser")
      .send({ email: AdminUser.email });
  });

  afterAll(async () => {
    await request(app)
      .post("/auth/deleteUser")
      .send({ email: CustomerUser.email });
  });

  it("should add product to user card", async () => {
    const productInCard = await request(app)
      .post("/products/addToCard")
      .set("Authorization", `Bearer ${customerAccessToken}`)
      .send({ productId: productId })
      .expect(200);

    expect(productInCard.body.productId).toBe(productId);
  });

  it("should add same product to card making quantity 2", async () => {
    const productInCard = await request(app)
      .post("/products/addToCard")
      .set("Authorization", `Bearer ${customerAccessToken}`)
      .send({ productId: productId })
      .expect(200);

    expect(productInCard.body.productId).toBe(productId);
    expect(productInCard.body.quantity).toBe(2);
  });

  it("should get all user Card", async () => {
    const productsInCard = await request(app)
      .get("/products/getUserCard")
      .set("Authorization", `Bearer ${customerAccessToken}`)
      .expect(200);

    expect(Array.isArray(productsInCard.body)).toBe(true);

    const foundObject = productsInCard.body.find(
      (item) => item.productId === productId
    );
    expect(foundObject).toBeTruthy();
  });

  it("should remove one of product makinq quantity 1", async () => {
    const productInCard = await request(app)
      .post("/products/removeProductFromCard")
      .set("Authorization", `Bearer ${customerAccessToken}`)
      .send({ productId: productId })
      .expect(200);

    expect(productInCard.text).toBe("quantity decremeted");
  });

  it("should remove product from card", async () => {
    const productInCard = await request(app)
      .post("/products/removeProductFromCard")
      .set("Authorization", `Bearer ${customerAccessToken}`)
      .send({ productId: productId })
      .expect(200);

    expect(productInCard.text).toBe("Product deleted from card");
  });
});
