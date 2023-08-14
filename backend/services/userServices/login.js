const User = require("../../schema/User");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { validationResult } = require("express-validator");

module.exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  if (req.body.pwd && req.body.email) {
    try {
      let user = await User.findOne(req.body).select("-pwd");
      if (user) {
        jwt.sign({ user }, secretKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          }
          res.send({ user, auth: token });
        });
      } else {
        res.status(404).send("User Not Found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).send("Email and Password are required");
  }
};
