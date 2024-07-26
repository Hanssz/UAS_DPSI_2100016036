const express = require("express");
const router = express.Router();
const Products = require("../models/products"); // Model Produk
const { authenticate, authorize } = require("../middleware/auth"); // Middleware autentikasi dan otorisasi
const upload = require("../middleware/upload"); // Middleware upload

// Route untuk membuat produk baru
router.post(
  "/",
  authenticate, // Middleware autentikasi
  authorize(["admin"]), // Middleware otorisasi, hanya untuk admin
  upload.single("img"), // Middleware upload file tunggal dengan field name "img"
  async (req, res, next) => {
    try {
      const productData = req.body;
      if (req.file) {
        // Jika ada file yang di-upload, tambahkan path file ke data produk
        productData.img = req.file.path;
      }
      console.log(productData);

      // Membuat produk baru di database
      const newProduct = await Products.create(productData);

      // Mengirimkan response status 201 (Created) dengan data produk baru
      res.status(201).json(newProduct);
    } catch (err) {
      // Menangani error, jika terjadi kesalahan
      console.error(err);
      next(err); // Melanjutkan ke middleware penanganan error berikutnya
    }
  }
);

// Route untuk mendapatkan semua produk
router.get("/", authenticate, async (req, res, next) => {
  try {
    const products = await Products.findAll(); // Mengambil semua produk dari database
    res.json(products); // Mengirimkan response dengan data produk
  } catch (err) {
    next(err); // Menangani error
  }
});

// Route untuk mendapatkan produk berdasarkan ID
router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id); // Mencari produk berdasarkan ID
    if (product) {
      res.json(product); // Mengirimkan response dengan data produk
    } else {
      res.status(404).json({ message: "Product not found" }); // Mengirimkan response jika produk tidak ditemukan
    }
  } catch (err) {
    next(err); // Menangani error
  }
});

// Route untuk memperbarui produk berdasarkan ID
router.put(
  "/:id",
  authenticate, // Middleware autentikasi
  authorize(["admin"]), // Middleware otorisasi, hanya untuk admin
  upload.single("img"), // Middleware upload file tunggal dengan field name "img"
  async (req, res, next) => {
    try {
      const product = await Products.findByPk(req.params.id); // Mencari produk berdasarkan ID
      if (product) {
        // Memperbarui data produk dengan data dari body request
        for (const key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            product[key] = req.body[key];
          }
        }
        // Jika ada file yang di-upload, tambahkan path file ke produk
        if (req.file) {
          product.img = req.file.path;
        }
        await product.save(); // Menyimpan perubahan ke database
        res.json(product); // Mengirimkan response dengan data produk yang diperbarui
      } else {
        res.status(404).json({ message: "Product not found" }); // Mengirimkan response jika produk tidak ditemukan
      }
    } catch (err) {
      next(err); // Menangani error
    }
  }
);

// Route untuk menghapus produk berdasarkan ID
router.delete(
  "/:id",
  authenticate, // Middleware autentikasi
  authorize(["admin"]), // Middleware otorisasi, hanya untuk admin
  async (req, res, next) => {
    try {
      const product = await Products.findByPk(req.params.id); // Mencari produk berdasarkan ID
      if (product) {
        await product.destroy(); // Menghapus produk dari database
        res.json({ message: "Product deleted" }); // Mengirimkan response bahwa produk telah dihapus
      } else {
        res.status(404).json({ message: "Product not found" }); // Mengirimkan response jika produk tidak ditemukan
      }
    } catch (err) {
      next(err); // Menangani error
    }
  }
);

module.exports = router; // Mengekspor router agar dapat digunakan di file lain
