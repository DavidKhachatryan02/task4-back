const express = require("express");
const request = require("supertest");
const router = require("../routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/auth", router);

const testUserData = {
  email: "testUser@test.com",
  name: "TestUserName",
  password: "TestPassword1",
  userRole: "admin",
};

describe("Auth API Routes", () => {
  it("should register a user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(testUserData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should login a user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: testUserData.email,
      password: testUserData.password,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should refresh a token", async () => {
    const userData = await request(app).post("/auth/login").send({
      email: testUserData.email,
      password: testUserData.password,
    });
    const response = await request(app).post("/auth/refreshToken").send({
      accessToken: userData.body.accessToken,
      refreshToken: userData.body.refreshToken,
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it("should get user information", async () => {
    const userTokens = await request(app)
      .post("/auth/login")
      .send({ email: testUserData.email, password: testUserData.password });
    const { accessToken } = userTokens.body;
    const response = await request(app)
      .get("/auth/getMe")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should delete User", async () => {
    const response = await request(app)
      .post("/auth/deleteUser")
      .send({ email: testUserData.email });
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      `Role with email ${testUserData.email} is deleted`
    );
  });
});
