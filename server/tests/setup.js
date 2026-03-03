import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import request from "supertest";
import User from "../models/User.js";

let mongo;

export async function initTestDB() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
}

export async function closeTestDB() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
}

/**
 * Register a user via the API (always gets USER role),
 * then optionally promote to a different role directly in DB.
 */
export async function createTestUser({ name, email, password, role = "USER" }) {
  const res = await request(app).post("/api/auth/register").send({ name, email, password });
  if (role !== "USER") {
    await User.findByIdAndUpdate(res.body.user.id, { role });
    // Re-login to get a token with the updated role
    const loginRes = await request(app).post("/api/auth/login").send({ email, password });
    return loginRes.body.token;
  }
  return res.body.token;
}

export { app, request };
