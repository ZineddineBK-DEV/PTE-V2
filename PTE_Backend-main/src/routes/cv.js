const express = require("express");
const router = express.Router();
const cvCtr = require("../controllers/cvController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.patch("/update/:id",authMiddleware, cvCtr.updateCv);
router.delete("/delete-item/:id/:arrayName/:itemId",authMiddleware, cvCtr.deleteElement);
router.post("/filter", authMiddleware, cvCtr.filterCvs);
router.post("/search", authMiddleware, cvCtr.searchCvs);


module.exports = router;
