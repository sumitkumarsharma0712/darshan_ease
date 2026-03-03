import { createBooking, listUserBookings, cancelBooking, listAllBookings } from "../services/bookingService.js";

export async function create(req, res, next) {
  try {
    const booking = await createBooking({
      userId: req.user._id,
      templeId: req.body.templeId,
      slotId: req.body.slotId,
      numberOfPersons: req.body.numberOfPersons || 1
    });
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
}

export async function myBookings(req, res, next) {
  try {
    const items = await listUserBookings(req.user._id);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function cancel(req, res, next) {
  try {
    const b = await cancelBooking(req.params.id, req.user._id);
    res.json(b);
  } catch (err) {
    next(err);
  }
}

export async function all(req, res, next) {
  try {
    const items = await listAllBookings();
    res.json(items);
  } catch (err) {
    next(err);
  }
}
