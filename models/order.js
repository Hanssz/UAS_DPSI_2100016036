const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Products = require("./products");
const User = require("./user");

const Order = sequelize.define("Order", {
  id_pesanan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_akun: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_produk: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kuantitas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalharga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: "productID",
    },
  },
  kartukredit: {
    type: DataTypes.INTEGER,
    allowNull: false,

  },
  pengirim: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Order;
