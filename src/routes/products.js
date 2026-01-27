const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET semua produk
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: "Gagal ambil data" });
  }
});

// POST tambah produk
router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Data tidak lengkap" });
    }

    const result = await pool.query(
      "INSERT INTO products (name, price) VALUES ($1,$2) RETURNING *",
      [name, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: "Gagal simpan data" });
  }
});

// PUT update produk
router.put("/:id", async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *",
      [name, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT ERROR:", err);
    res.status(500).json({ error: "Gagal update data" });
  }
});

// DELETE produk
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM products WHERE id=$1", [id]);
    res.json({ message: "Berhasil dihapus" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Gagal hapus" });
  }
});

module.exports = router;
