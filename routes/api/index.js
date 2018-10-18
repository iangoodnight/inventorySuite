const router = require("express").Router();
const apiRoutes = require("./api");

// API routes
router.use(apiRoutes);

module.exports = router;