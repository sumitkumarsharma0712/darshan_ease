import { createDonation, listUserDonations, listAllDonations, getDonationStats } from "../services/donationService.js";

export async function donate(req, res, next) {
  try {
    const d = await createDonation({
      userId: req.user._id,
      templeId: req.body.templeId,
      amount: req.body.amount,
      currency: req.body.currency,
      message: req.body.message,
      isAnonymous: req.body.isAnonymous
    });
    res.status(201).json(d);
  } catch (err) {
    next(err);
  }
}

export async function myDonations(req, res, next) {
  try {
    const items = await listUserDonations(req.user._id);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function all(req, res, next) {
  try {
    const items = await listAllDonations();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function stats(req, res, next) {
  try {
    const data = await getDonationStats();
    res.json(data);
  } catch (err) {
    next(err);
  }
}
