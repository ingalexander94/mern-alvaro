const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authValidator = require("../validators/auth.validator");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.post(
  "/register",
  authValidator.validateRegister(),
  authController.register
);
router.put(
  "/recovery",
  [validateToken, authValidator.validateRecovery()],
  authController.recovery
);
router.post("/login", authValidator.validateLogin(), authController.login);
router.post("/forgot", authValidator.validateForgot(), authController.forgot);
router.get("/activate", authController.activate);
router.get("/renew", validateToken, authController.renew);

module.exports = router;
