
const Product = require("../../schema/Product");


module.exports.getProduct = async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No Result Found" });
    }
  };