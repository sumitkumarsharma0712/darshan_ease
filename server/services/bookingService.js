import Booking from "../models/Booking.js";
import DarshanSlot from "../models/DarshanSlot.js";

export async function createBooking({ userId, templeId, slotId, numberOfPersons = 1 }) {
  const slot = await DarshanSlot.findById(slotId);
  if (!slot || slot.status === "CLOSED") {
    const err = new Error("Slot not available");
    err.status = 400;
    throw err;
  }
  if (slot.availableSeats < numberOfPersons) {
    const err = new Error(`Only ${slot.availableSeats} seat(s) available`);
    err.status = 400;
    throw err;
  }

  const existing = await Booking.findOne({ user: userId, slot: slotId, status: "CONFIRMED" });
  if (existing) {
    const err = new Error("You have already booked this slot");
    err.status = 400;
    throw err;
  }

  const booking = await Booking.create({
    user: userId,
    temple: templeId,
    slot: slotId,
    numberOfPersons,
    status: "CONFIRMED"
  });

  slot.availableSeats -= numberOfPersons;
  if (slot.availableSeats === 0) slot.status = "FULL";
  await slot.save();

  return booking;
}

export function listUserBookings(userId) {
  return Booking.find({ user: userId })
    .populate("temple", "name location imageUrl")
    .populate("slot", "date startTime endTime price")
    .sort({ createdAt: -1 });
}

export async function cancelBooking(bookingId, userId) {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) {
    const err = new Error("Booking not found");
    err.status = 404;
    throw err;
  }
  if (booking.status === "CANCELLED") return booking;

  booking.status = "CANCELLED";
  await booking.save();

  const slot = await DarshanSlot.findById(booking.slot);
  if (slot) {
    slot.availableSeats = Math.min(slot.capacity, slot.availableSeats + booking.numberOfPersons);
    if (slot.status === "FULL") slot.status = "OPEN";
    await slot.save();
  }
  return booking;
}

export function listAllBookings() {
  return Booking.find()
    .populate("user", "name email")
    .populate("temple", "name location")
    .populate("slot", "date startTime endTime")
    .sort({ createdAt: -1 });
}
