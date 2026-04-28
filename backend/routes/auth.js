const router = require("express").Router();

// TEST AUTH
router.get("/", (req, res) => {
  res.send("Auth jalan");
});

module.exports = router;