const express = require("express");
const { healthController } = require("../controllers");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.route");

const router = express.Router();

router.get("/health", healthController.getHealth);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
