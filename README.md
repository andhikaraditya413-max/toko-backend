# 🛒 Toko Mini - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

Backend untuk website **Toko Mini**. Backend dibuat menggunakan **Node.js + Express + PostgreSQL** dan menyediakan API CRUD untuk produk. Frontend menggunakan **HTML + TailwindCSS** untuk menampilkan data dari backend.

---

## ⚡ Fitur
- CRUD Produk (Create, Read, Update, Delete)
- API siap dihubungkan ke frontend Tailwind

---

## 🗂️ Struktur Project
TOKO-BACKEND/
│
├─ app.js # File utama menjalankan server
├─ db.js # Koneksi PostgreSQL
├─ routes/
│ └─ products.js # Route produk
├─ .env # Konfigurasi environment
├─ package.json # Konfigurasi project & dependency
└─ README.md # Dokumentasi


---

## ⚙️ Instalasi & Menjalankan Server

1. Clone repository backend:
```bash
git clone <URL_REPO_BACKEND>
cd TOKO-BACKEND
Install dependency:

npm install
Buat file .env:

PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/toko_mini
Jalankan server development:

npm run dev
Server berjalan di: http://localhost:5000

Jalankan server produksi:

npm start
🖥️ API Endpoint
Method	Endpoint	Keterangan	Contoh curl
GET	/products	Ambil semua produk	curl http://localhost:5000/products
GET	/products/:id	Ambil produk berdasarkan id	curl http://localhost:5000/products/1
POST	/products	Tambah produk baru	curl -X POST http://localhost:5000/products -H "Content-Type: application/json" -d '{"name":"Produk A","price":10000,"description":"Deskripsi"}'
PUT	/products/:id	Update produk berdasarkan id	curl -X PUT http://localhost:5000/products/1 -H "Content-Type: application/json" -d '{"name":"Produk B","price":15000}'
DELETE	/products/:id	Hapus produk berdasarkan id	curl -X DELETE http://localhost:5000/products/1
🗄️ Database
Menggunakan PostgreSQL

Contoh tabel products:

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
🌐 Menghubungkan Frontend (TailwindCSS) ke Backend
Contoh fetch API di script.js frontend:

// Ambil semua produk dari backend
fetch('http://localhost:5000/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('products');
    data.forEach(product => {
      const card = document.createElement('div');
      card.className = "p-4 border rounded shadow";
      card.innerHTML = `
        <h3 class="text-lg font-bold">${product.name}</h3>
        <p class="text-gray-700">Rp ${product.price}</p>
        <p class="text-gray-500">${product.description}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error(err));
Di index.html frontend:

<div id="products" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
Dengan begitu, frontend Tailwind akan otomatis menampilkan data produk dari backend.

💡 Catatan
Pastikan PostgreSQL sudah berjalan sebelum server dijalankan.

Pastikan port backend sama dengan URL fetch di frontend.

Backend hanya menyediakan CRUD; semua tampilan ditangani di frontend dengan TailwindCSS.


---

Kalau mau, aku bisa buatkan **versi ini sudah lengkap dengan badge GitHub dan contoh commit Git**, biar langsung tinggal `git add .`, `git commit -m "Add README"`, dan `git push`.  

Apakah mau aku buatkan juga versi itu?