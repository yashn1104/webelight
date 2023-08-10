const Product = require("../schema/Product");

module.exports.addProducut = async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
};

module.exports.getProduct = async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Result Found" });
  }
};

module.exports.deleteProduct = async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
};

module.exports.getUpdateProduct = async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No results Found" });
  }
};

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
