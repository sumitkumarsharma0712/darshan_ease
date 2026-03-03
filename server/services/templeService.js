import Temple from "../models/Temple.js";

export function listTemples(query = {}) {
  const q = { isActive: true };

  if (query.search) {
    const regex = new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    q.$or = [
      { name: regex },
      { location: regex },
      { deity: regex }
    ];
  }

  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;

  return Temple.find(q).sort({ createdAt: -1 }).skip(skip).limit(limit);
}

export async function countTemples(query = {}) {
  const q = { isActive: true };
  if (query.search) {
    const regex = new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    q.$or = [
      { name: regex },
      { location: regex },
      { deity: regex }
    ];
  }
  return Temple.countDocuments(q);
}

export function getTemple(id) {
  return Temple.findById(id);
}

export function createTemple(data, userId) {
  return Temple.create({ ...data, createdBy: userId });
}

export function updateTemple(id, data) {
  const allowed = ["name", "location", "description", "deity", "imageUrl", "timings", "contactInfo", "isActive"];
  const update = {};
  for (const key of allowed) {
    if (data[key] !== undefined) update[key] = data[key];
  }
  return Temple.findByIdAndUpdate(id, update, { new: true, runValidators: true });
}

export function deleteTemple(id) {
  return Temple.findByIdAndDelete(id);
}
