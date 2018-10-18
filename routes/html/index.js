const router = require("express").Router();
const htmlRoutes = require("./html");

// Page routes
router.use(htmlRoutes);

module.exports = router;