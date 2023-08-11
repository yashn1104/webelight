const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

module.exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, secretKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please add valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "please add token with header" });
  }
};
