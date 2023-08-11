const { register } = require("../services/userServices/register");
const { login } = require("../services/userServices/login");

module.exports.registerUser = register();

module.exports.loginUser = login();
