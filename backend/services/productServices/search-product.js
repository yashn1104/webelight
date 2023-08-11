const Product = require("../../schema/Product");

module.exports.searchProduct = async (req, res) => {
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
  };
  