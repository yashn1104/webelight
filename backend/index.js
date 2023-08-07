const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema/User.js");
const Product = require("./schema/Product.js");

const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.pwd;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.pwd && req.body.email) {
    let user = await User.findOne(req.body).select("-pwd");
    if (user) {
      res.send(user);
    } else {
      res.send("User No Found");
    }
  } else {
    res.send("User No Found");
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/product", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Result Found" });
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("listening on : " + PORT));
