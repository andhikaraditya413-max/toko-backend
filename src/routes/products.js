const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua produk
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM products ORDER BY id DESC");
  res.json(result.rows);
});

// POST tambah produk
router.post("/", async (req, res) => {
  const { name, price } = req.body;
  const result = await db.query(
    "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
    [name, price]
  );
  res.json(result.rows[0]);
});

module.exports = router;
