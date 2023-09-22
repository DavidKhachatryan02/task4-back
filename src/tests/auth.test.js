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

let accessToken;
let refreshToken;

describe("Auth API Routes", () => {
  it("should register a user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(testUserData)
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({}));
    accessToken = response.body.accessToken;
    refreshToken = response.body.refreshToken;
  });

  it("should login a user", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: testUserData.email,
        password: testUserData.password,
      })
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({}));
  });

  it("should refresh a token", async () => {
    const response = await request(app)
      .post("/auth/refreshToken")
      .send({ accessToken, refreshToken })
      .expect(200);
    expect(response.body).toMatchObject({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
    accessToken = response.body.accessToken;
  });

  it("should get user information", async () => {
    const response = await request(app)
      .get("/auth/getMe")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
    expect(response.body).toEqual(expect.objectContaining({}));
    const allowedRoles = ["Admin", "Customer", "User"];
    const userRoles = response.body.roles;

    expect(userRoles).toContainEqual(
      expect.stringMatching(new RegExp(allowedRoles.join("|"), "i"))
    );
  });

  it("should logout user", async () => {
    await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);
  });

  it("should delete User", async () => {
    const response = await request(app)
      .post("/auth/deleteUser")
      .send({ email: testUserData.email })
      .expect(200);
    expect(response.text).toBe(
      `User with email ${testUserData.email} is deleted`
    );
  });
});
