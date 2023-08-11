const { Router } = require("express");
const { addProducut } = require("../services/productServices/add-product");
const { getProduct } = require("../services/productServices/get-product");
const { deleteProduct } = require("../services/productServices/delete-product");
const {
  getUpdateProduct,
} = require("../services/productServices/getupdate-product");
const { updateProduct } = require("../services/productServices/update-product");
const { searchProduct } = require("../services/productServices/search-product");

const { verifyToken } = require("../middleware/jwtVerify.js");

const router = Router();

router.post("/add-product", verifyToken, addProducut);
router.get("/product", verifyToken, getProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.get("/update/:id", verifyToken, getUpdateProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.get("/search/:key", verifyToken, searchProduct);

module.exports = router;
