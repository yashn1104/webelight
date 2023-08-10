const User = require("../schema/User");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
  }
  res.send(req.body);
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.pwd;
  jwt.sign({ result }, secretKey, { expiresIn: "2h" }, (err, token) => {
    res.send({ result, auth: token });
  });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(errors);
  }
  res.send(req.body);
  if (req.body.pwd && req.body.email) {
    let user = await User.findOne(req.body).select("-pwd");
    if (user) {
      jwt.sign({ user }, secretKey, { expiresIn: "2h" }, (err, token) => {
        res.send({ user, auth: token });
      });
    } else {
      res.send("User No Found");
    }
  } else {
    res.send("User No Found");
  }
};
