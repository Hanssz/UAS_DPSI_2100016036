const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize("freedb_dpsi_uas_2100016036", "freedb_hanif", "kYR#!W7$6Ne$22*", {
  host: "sql.freedb.tech",
  dialectModule: mysql2,
  dialect: "mysql",
});

module.exports = sequelize;
