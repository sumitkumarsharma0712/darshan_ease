import { listSlotsByTemple, createSlot, updateSlot, deleteSlot } from "../services/slotService.js";

export async function listByTemple(req, res, next) {
  try {
    const slots = await listSlotsByTemple(req.params.templeId, req.query);
    res.json(slots);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const slot = await createSlot(req.body);
    res.status(201).json(slot);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const slot = await updateSlot(req.params.id, req.body);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.json(slot);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const r = await deleteSlot(req.params.id);
    if (!r) return res.status(404).json({ message: "Slot not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
