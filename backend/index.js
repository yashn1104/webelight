const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(productRoutes, userRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("listening on : " + PORT));
