const Product = require("../../schema/Product");

module.exports.getUpdateProduct = async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No results Found" });
  }
};
