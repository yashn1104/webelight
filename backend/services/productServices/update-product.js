
const Product = require("../../schema/Product");

module.exports.updateProduct = async (req, res) => {
    let result = await Product.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: req.body,
      }
    );
    res.send(result);
  };
  