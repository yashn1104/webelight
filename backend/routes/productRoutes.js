const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

const { Router } = require("express");
const {
  addProducut,
  getProduct,
  deleteProduct,
  getUpdateProduct,
  updateProduct,
  searchProduct,
} = require("../Controllers/productController");
const router = Router();

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

router.post("/add-product", verifyToken, addProducut);
router.get("/product", verifyToken, getProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.get("/update/:id", verifyToken, getUpdateProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.get("/search/:key", verifyToken, searchProduct);

module.exports = router;
