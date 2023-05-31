const express = require("express");
const router = express.Router();
const virtualizationEnvCtr = require("../../controllers/material_resources/virtualizationEnvController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.get("/getEvents",authMiddleware, virtualizationEnvCtr.getAllVirtsEnv);
router.post("/setEvent",authMiddleware, virtualizationEnvCtr.addVirtEnv);
router.patch("/acceptEvent/:id",authMiddleware, virtualizationEnvCtr.accepetEvent);
router.delete("/deleteVirtEnv/:id",authMiddleware, virtualizationEnvCtr.deleteVirtEnv);
router.post("/sendEmail",authMiddleware, virtualizationEnvCtr.SendEmail);
module.exports = router;
