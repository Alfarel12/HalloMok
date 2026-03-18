const router = require("express").Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM lapangan", (err, result) => {
    res.send(result);
  });
});

module.exports = router;