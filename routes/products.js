const express = require("express");
const router = express.Router();
const Products = require("../models/products");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post(
  "/",
  authenticate,
  authorize(["admin"]), 
  upload.single("img"),
  async (req, res, next) => {
    try {
      const productData = req.body;
      if (req.file) {
        productData.img = req.file.path;
      }
      console.log(productData);
      const newProduct = await Products.create(productData);
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

router.get("/", authenticate, async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  upload.single("img"),
  async (req, res, next) => {
    try {
      const product = await Products.findByPk(req.params.id);
      if (product) {
        for (const key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            product[key] = req.body[key];
          }
        }
        if (req.file) {
          product.img = req.file.path;
        }
        await product.save();
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  async (req, res, next) => {
    try {
      const product = await Products.findByPk(req.params.id);
      if (product) {
        await product.destroy();
        res.json({ message: "Product deleted" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
