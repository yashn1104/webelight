const User = require("../../schema/User");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    const { name, email, pwd } = req.body;

    const existingProduct = await User.findOne({ where: { email } });
    if (existingProduct) {
      return res.status(400).json({ error: "email is already taken" });
    }

    let user = new User({ name, email, pwd });
    let result = await user.save();
    result = result.toObject();
    delete result.pwd;

    jwt.sign({ result }, secretKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send({ result, auth: token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
