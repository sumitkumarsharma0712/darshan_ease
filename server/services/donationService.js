import Donation from "../models/Donation.js";

export function createDonation({ userId, templeId, amount, currency = "INR", message = "", isAnonymous = false }) {
  if (!amount || amount < 1) {
    const err = new Error("Invalid donation amount");
    err.status = 400;
    throw err;
  }
  return Donation.create({ user: userId, temple: templeId, amount, currency, message, isAnonymous });
}

export function listUserDonations(userId) {
  return Donation.find({ user: userId })
    .populate("temple", "name location imageUrl")
    .sort({ createdAt: -1 });
}

export function listAllDonations() {
  return Donation.find()
    .populate("user", "name email")
    .populate("temple", "name location")
    .sort({ createdAt: -1 });
}

export async function getDonationStats() {
  const stats = await Donation.aggregate([
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        totalCount: { $sum: 1 },
        avgAmount: { $avg: "$amount" }
      }
    }
  ]);
  return stats[0] || { totalAmount: 0, totalCount: 0, avgAmount: 0 };
}
