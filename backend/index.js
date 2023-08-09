const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema/User.js");
const Product = require("./schema/Product.js");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const secretKey = "secretkey";

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
  jwt.sign({ result }, secretKey, { expiresIn: "2h" }, (err, token) => {
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  if (req.body.pwd && req.body.email) {
    let user = await User.findOne(req.body).select("-pwd");
    if (user) {
      // res.send(user);
      jwt.sign({ user }, secretKey, { expiresIn: "2h" }, (err, token) => {
        res.send({ user, auth: token });
      });
    } else {
      res.send("User No Found");
    }
  } else {
    res.send("User No Found");
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/product", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Result Found" });
  }
});

app.delete("/delete/:id", verifyToken, async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/update/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No results Found" });
  }
});

app.put("/update/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});

// const verifyToken = (req,res,next)=>{
//   console.log("middleware called");
//   next();
// }

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, secretKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please add valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("listening on : " + PORT));
