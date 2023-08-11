const Product = require("../../schema/Product");

module.exports.addProducut = async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
  };
  
