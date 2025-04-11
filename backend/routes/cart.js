import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST /cart - Submit an order
router.post("/", (req, res) => {
  const { user_id, items, total } = req.body;
  if (!user_id || !items || !total) return res.status(400).json({ error: "Missing fields" });

  const query = `INSERT INTO carts (user_id, items, total) VALUES (?, ?, ?)`;
  db.query(query, [user_id, JSON.stringify(items), total], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.status(201).json({ message: "Cart saved", cartId: result.insertId });
  });
});

// GET /cart/:user_id - Get all orders for a user
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query(`SELECT * FROM carts WHERE user_id = ?`, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

export default router;
