const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * GET /products
 * Ambil semua produk
 */
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal ambil data produk" });
  }
});

/**
 * GET /products/:id
 * Ambil 1 produk
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal ambil detail produk" });
  }
});

/**
 * POST /products
 * Tambah produk
 */
router.post("/", async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Nama & harga wajib diisi" });
    }

    const result = await db.query(
      "INSERT INTO products (name, price, stock) VALUES ($1, $2, $3) RETURNING *",
      [name, price, stock || 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal tambah produk" });
  }
});

/**
 * PUT /products/:id
 * Update produk
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;

    const result = await db.query(
      "UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4 RETURNING *",
      [name, price, stock, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal update produk" });
  }
});

/**
 * DELETE /products/:id
 * Hapus produk
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM products WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal hapus produk" });
  }
});

module.exports = router;
