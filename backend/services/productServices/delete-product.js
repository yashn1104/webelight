const Product = require("../../schema/Product");

module.exports.deleteProduct = async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
  };