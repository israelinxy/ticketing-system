import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import server from "../server.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

describe("Tickets API", () => {
  let token;
  let ticketId;

  beforeAll(async () => {
    await User.deleteMany({});
    const response = await request(app).post("/api/users/signup").send({
      name: "Test User",
      email: "test@email.com",
      password: "12345678",
    });

    token = response.body.token;
  });

  afterAll(async () => {
    await Ticket.deleteMany({});
    server.close();
    await mongoose.connection.close();
  });

  // Test para crear un nuevo ticket
  test("create a new ticket", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Ticket",
        description: "Test Ticket Description",
        priority: "high",
        status: "open",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("ticket");
    expect(response.body.ticket).toHaveProperty("title", "Test Ticket");
    expect(response.body.ticket).not.toHaveProperty("_id");
    
    ticketId = response.body.ticket._id; 
  });

  // Test para obtener todos los tickets
  test("Get all tickets", async () => {
    const ticket1 = await Ticket.create({
      title: "Ticket 1",
      description: "Ticket 1 Description",
      priority: "low",
      status: "open",
      user: "test-user-id",
    });

    const ticket2 = await Ticket.create({
      title: "Ticket 2",
      description: "Ticket 2 Description",
      priority: "medium",
      status: "in-progress",
      user: "test-user-id",
    });

    const response = await request(app).get("/api/tickets");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("results");
    expect(response.body).toHaveProperty("total");
    expect(response.body).toHaveProperty("currentPage");

    expect(response.body.total).toBe(2);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.results).toHaveLength(2);
    expect(response.body.results[0]).toHaveProperty("title", "Ticket 1");
    expect(response.body.results[0]).not.toHaveProperty("_id");
  });

  // Test para obtener un ticket por su id
  test("Get a ticket by id", async () => {
    const ticket = await Ticket.create({
      title: "Get Ticket",
      description: "Get Ticket Description",
      priority: "high",
      status: "open",
      user: "test-user-id",
    });

    const response = await request(app).get(`/api/tickets/${ticket._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ticket");
    expect(response.body.ticket).toHaveProperty("title", "Get Ticket");
    expect(response.body.ticket).toHaveProperty("_id", ticket._id);
  });

  // Test para actualizar un ticket por su id
  test("Update a ticket by id", async () => {
    const ticket = await Ticket.create({
      title: "Update Ticket",
      description: "Update Ticket Description",
      priority: "medium",
      status: "open",
      user: "test-user-id",
    });

    const response = await request(app)
      .put(`/api/tickets/${ticket._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Ticket",
        description: "Updated Ticket Description",
        priority: "medium",
        status: "closed",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("ticket");
    expect(response.body.ticket).toHaveProperty("title", "Updated Ticket");
    expect(response.body.ticket).toHaveProperty("status", "closed");
  });

  // Test para borrar un ticket
  test("Delete a ticket", async () => {
    const ticket = await Ticket.create({
      title: "Delete Ticket",
      description: "Delete Ticket Description",
      priority: "low",
      status: "open",
      user: "test-user-id",
    });

    const response = await request(app)
      .delete(`/api/tickets/${ticket._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app).get(`/api/tickets/${ticket._id}`);
    expect(getResponse.status).toBe(404);
  });
});
