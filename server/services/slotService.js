import DarshanSlot from "../models/DarshanSlot.js";

export function listSlotsByTemple(templeId, query = {}) {
  const q = { temple: templeId };
  if (query.date) q.date = query.date;
  if (query.status) q.status = query.status;
  return DarshanSlot.find(q).sort({ date: 1, startTime: 1 });
}

export function createSlot(data) {
  const availableSeats = data.availableSeats ?? data.capacity;
  return DarshanSlot.create({ ...data, availableSeats });
}

export function updateSlot(id, data) {
  const allowed = ["date", "startTime", "endTime", "capacity", "availableSeats", "price", "status"];
  const update = {};
  for (const key of allowed) {
    if (data[key] !== undefined) update[key] = data[key];
  }
  return DarshanSlot.findByIdAndUpdate(id, update, { new: true, runValidators: true });
}

export function deleteSlot(id) {
  return DarshanSlot.findByIdAndDelete(id);
}

export async function adjustAvailability(slotId, delta) {
  const slot = await DarshanSlot.findById(slotId);
  if (!slot) {
    const err = new Error("Slot not found");
    err.status = 404;
    throw err;
  }
  const next = slot.availableSeats + delta;
  if (next < 0 || next > slot.capacity) {
    const err = new Error("Invalid availability update");
    err.status = 400;
    throw err;
  }
  slot.availableSeats = next;
  if (next === 0) slot.status = "FULL";
  else if (slot.status === "FULL") slot.status = "OPEN";
  await slot.save();
  return slot;
}
