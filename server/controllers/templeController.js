import { listTemples, getTemple, createTemple, updateTemple, deleteTemple, countTemples } from "../services/templeService.js";

export async function list(req, res, next) {
  try {
    const [items, total] = await Promise.all([
      listTemples(req.query),
      countTemples(req.query)
    ]);
    res.json({ temples: items, total, page: parseInt(req.query.page) || 1 });
  } catch (err) {
    next(err);
  }
}

export async function detail(req, res, next) {
  try {
    const item = await getTemple(req.params.id);
    if (!item) return res.status(404).json({ message: "Temple not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const item = await createTemple(req.body, req.user._id);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const item = await updateTemple(req.params.id, req.body);
    if (!item) return res.status(404).json({ message: "Temple not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const item = await deleteTemple(req.params.id);
    if (!item) return res.status(404).json({ message: "Temple not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}
