const { Router } = require("express");
const { body } = require("express-validator");

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

router.post(
  "/add-product",
  [
    body("name", "Enter a valid name")
      .notEmpty()
      .withMessage(
        "The name should contain only letters and should be unique."
      ),
    body("price", "Enter a valid price").notEmpty(),
    body("category", "Enter a valid category").notEmpty(),
    body("company", "Enter a valid company").notEmpty(),
  ],
  verifyToken,
  addProducut
);
router.get("/product", verifyToken, getProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);
router.get("/update/:id", verifyToken, getUpdateProduct);
router.put("/update/:id", verifyToken, updateProduct);
router.get("/search/:key", verifyToken, searchProduct);

module.exports = router;
