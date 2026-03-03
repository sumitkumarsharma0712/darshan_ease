import { app, request, initTestDB, closeTestDB, createTestUser } from "./setup.js";

let adminToken;
let userToken;
let templeId;
let slotId;

beforeAll(async () => {
  await initTestDB();
  adminToken = await createTestUser({ name: "Admin", email: "admin@example.com", password: "AdminPass123", role: "ADMIN" });
  userToken = await createTestUser({ name: "User", email: "user@example.com", password: "UserPass123" });
});

afterAll(async () => {
  await closeTestDB();
});

describe("Temple, Slot & Booking flow", () => {
  test("admin creates a temple", async () => {
    const res = await request(app)
      .post("/api/temples")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Temple A", location: "City", description: "Desc", deity: "Deity" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Temple A");
    templeId = res.body._id;
  });

  test("user cannot create a temple", async () => {
    const res = await request(app)
      .post("/api/temples")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "Bad Temple", location: "Nowhere" });
    expect(res.status).toBe(403);
  });

  test("list temples returns paginated result", async () => {
    const res = await request(app).get("/api/temples");
    expect(res.status).toBe(200);
    expect(res.body.temples).toBeDefined();
    expect(res.body.total).toBeGreaterThanOrEqual(1);
  });

  test("admin creates a slot", async () => {
    const res = await request(app)
      .post("/api/slots")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ temple: templeId, date: "2026-03-10", startTime: "09:00", endTime: "10:00", capacity: 2 });
    expect(res.status).toBe(201);
    expect(res.body.availableSeats).toBe(2);
    slotId = res.body._id;
  });

  test("user books a slot", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ templeId, slotId });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("CONFIRMED");
  });

  test("slot availability decreases after booking", async () => {
    const res = await request(app).get(`/api/slots/temple/${templeId}`);
    expect(res.body[0].availableSeats).toBe(1);
  });

  test("duplicate booking is rejected", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ templeId, slotId });
    expect(res.status).toBe(400);
  });

  test("user lists their bookings", async () => {
    const res = await request(app)
      .get("/api/bookings/me")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test("user cancels a booking and seats restore", async () => {
    const listRes = await request(app).get("/api/bookings/me").set("Authorization", `Bearer ${userToken}`);
    const bookingId = listRes.body[0]._id;

    const cancelRes = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(cancelRes.status).toBe(200);
    expect(cancelRes.body.status).toBe("CANCELLED");

    const slotsRes = await request(app).get(`/api/slots/temple/${templeId}`);
    expect(slotsRes.body[0].availableSeats).toBe(2);
  });
});
