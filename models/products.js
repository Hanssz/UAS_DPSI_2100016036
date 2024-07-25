const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const User = require("./user");
const Products = sequelize.define("Product", {
  id_produk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama_produk: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga_produk: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stok_produk: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "userID",
    },
  },
});

module.exports = Products;
