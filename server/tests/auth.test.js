import { app, request, initTestDB, closeTestDB } from "./setup.js";

beforeAll(async () => {
  await initTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

describe("Auth API", () => {
  test("register creates a new user with USER role", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "Password123"
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.role).toBe("USER");
    expect(res.body.user.email).toBe("test@example.com");
  });

  test("register rejects duplicate email", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Duplicate",
      email: "test@example.com",
      password: "Password123"
    });
    expect(res.status).toBe(400);
  });

  test("register always forces USER role even if ADMIN is sent", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Sneaky Admin",
      email: "sneaky@example.com",
      password: "Password123",
      role: "ADMIN"
    });
    expect(res.status).toBe(201);
    expect(res.body.user.role).toBe("USER");
  });

  test("login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Password123"
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("login with wrong password returns 401", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "WrongPassword"
    });
    expect(res.status).toBe(401);
  });

  test("GET /me with valid token returns user", async () => {
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "Password123"
    });
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe("test@example.com");
  });

  test("GET /me without token returns 401", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });
});
