const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Products = require('./products');
const User = require('./user');

const Order = sequelize.define('Order', {
  id_pesanan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_akun: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_akun',
    },
  },
  id_produk: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Products,
      key: 'id_produk',
    },
  },
  kuantitas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalharga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kartukredit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;
