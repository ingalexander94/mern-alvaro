const { Router } = require("express");
const roleController = require("../controllers/role.controller");

const router = Router();

router.post("/", roleController.createRole);
router.get("/", roleController.getRoles);
router.delete("/:id", roleController.toggleRole);

module.exports = router;
