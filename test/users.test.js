import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import User from "../models/User.js";


describe("Users API", () => {
  let createdUser;

  beforeAll(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  // Test para crear un nuevo usuario (signup)
  test("create a new user", async () => {
    const response = await request(app).post("/api/users/signup").send({
      name: "Test User",
      email: "test@email.com",
      password: "12345678",
      role: "user",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");

    createdUser = {
      email: response.body.user.email,
      password: "12345678",
    };
  });

  // Test para logear un  usuario existente (login)
  test("login the created user", async () => {
    const loginResponse = await request(app).post("/api/users/login").send({
      email: createdUser.email,
      password: createdUser.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
    expect(loginResponse.body).toHaveProperty("user");
    expect(loginResponse.body.user.email).toBe(createdUser.email);
  });
});
