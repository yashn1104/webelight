const User = require("../../schema/User");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { validationResult } = require("express-validator");

module.exports.register = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json(errors);
  // }
  // res.send(req.body);
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.pwd;
  jwt.sign({ result }, secretKey, { expiresIn: "2h" }, (err, token) => {
    res.send({ result, auth: token });
  });
};
