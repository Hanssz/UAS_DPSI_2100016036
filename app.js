var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sequelize = require("./models/index");
var productsRouter = require("./routes/products");
var authRouter = require("./routes/auth");
var orderRouter = require("./routes/order");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/products", productsRouter);
app.use("/auth", authRouter);
app.use("/order", orderRouter);

app.all("*", (req, res) => {
  console.log("Hallo Server");
});

app.listen(3001, async () => {
  await sequelize
    .sync({
      force: true,
    })
    .then(() => {
      console.log("Database Berjalan");
    })
    .catch((err) => {
      console.error("Error synchronizing database:", err);
    });
  console.info("Server Berjalan");
});

module.exports = app;
