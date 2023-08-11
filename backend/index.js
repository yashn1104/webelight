const express = require("express");
require("./db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(productRoutes, userRoutes);

app.listen(PORT, () => console.log("listening on : " + PORT));
