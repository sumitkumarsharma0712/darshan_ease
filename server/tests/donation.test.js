import { app, request, initTestDB, closeTestDB, createTestUser } from "./setup.js";

let adminToken;
let userToken;
let templeId;

beforeAll(async () => {
  await initTestDB();
  adminToken = await createTestUser({ name: "Admin", email: "admin2@example.com", password: "AdminPass123", role: "ADMIN" });
  userToken = await createTestUser({ name: "User", email: "user2@example.com", password: "UserPass123" });

  const tRes = await request(app)
    .post("/api/temples")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ name: "Temple B", location: "Town" });
  templeId = tRes.body._id;
});

afterAll(async () => {
  await closeTestDB();
});

describe("Donation flow", () => {
  test("user makes a donation", async () => {
    const res = await request(app)
      .post("/api/donations")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ templeId, amount: 500, message: "Blessings" });
    expect(res.status).toBe(201);
    expect(res.body.amount).toBe(500);
  });

  test("user lists their donations", async () => {
    const res = await request(app)
      .get("/api/donations/me")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("admin lists all donations", async () => {
    const res = await request(app)
      .get("/api/donations")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("admin gets donation stats", async () => {
    const res = await request(app)
      .get("/api/donations/stats")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.totalAmount).toBe(500);
    expect(res.body.totalCount).toBe(1);
  });

  test("user cannot access admin donation routes", async () => {
    const res = await request(app)
      .get("/api/donations")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });
});
