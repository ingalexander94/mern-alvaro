const { check } = require("express-validator");
const { validateBody } = require("../middlewares/validateBody");

const rulesPassword = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

const validateRegister = () => [
  check("fullname", "The fullname field is required").not().isEmpty(),
  check("email", "The email field is required").isEmail(),
  check("password", "The password field is required").isStrongPassword(
    rulesPassword
  ),
  check("confirmPassword", "The confirm pasword field not matched")
    .exists()
    .custom((value, { req }) => value === req.body.password),
  check("role", "The role field is required").isMongoId(),
  validateBody,
];

const validateLogin = () => [
  check("email", "The email field is required").isEmail(),
  check("password", "The password field is required").isStrongPassword(
    rulesPassword
  ),
  check("role", "The role field is required").isMongoId(),
  validateBody,
];

const validateForgot = () => [
  check("email", "The email field is required").isEmail(),
  check("role", "The role field is required").isMongoId(),
  validateBody,
];

const validateRecovery = () => [
  check("newPassword", "The new password field is required").isStrongPassword(
    rulesPassword
  ),
  check("confirmNewPassword", "The confirm new pasword field not matched")
    .exists()
    .custom((value, { req }) => value === req.body.newPassword),
  validateBody,
];

module.exports = {
  validateRegister,
  validateLogin,
  validateForgot,
  validateRecovery,
};
