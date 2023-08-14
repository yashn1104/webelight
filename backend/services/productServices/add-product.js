const Product = require("../../schema/Product");
const { validationResult } = require("express-validator");

module.exports.addProducut = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  try {
    const { name, price, category, company } = req.body;

    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(400).json({ error: "Name already taken" });
    }

    let product = new Product({ name, price, category, company });
    let result = await product.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
