const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const htmlRoutes = require("./html");

// API routes
router.use("/api", apiRoutes);

// HTML routes
router.use(htmlRoutes);

module.exports = router;