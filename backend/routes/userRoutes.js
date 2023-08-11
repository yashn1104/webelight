const { Router } = require("express");
const { body } = require("express-validator");

// const { registerUser, loginUser } = require("../Controllers/userController");
const { register } = require("../services/userServices/register");
const { login } = require("../services/userServices/login");

const router = Router();

router.post(
  "/register",
  [
    body("name", "Enter a valid name").notEmpty().isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("pwd", "Enter a valid password")
      .isLength({ min: 3 })
      .isLength({ max: 8 }),
  ],
  register
);
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("pwd", "Enter a valid password")
      .isLength({ min: 3 })
      .isLength({ max: 8 }),
  ],
  login
);

module.exports = router;
