const { Router } = require("express");
const validateToken = require("../middlewares/validateToken");
const uploadController = require("../controllers/upload.controller");

const router = Router();

router.post("/avatar", validateToken, uploadController.uploadAvatar);
router.delete("/avatar", validateToken, uploadController.deleteAvatar);

module.exports = router;
