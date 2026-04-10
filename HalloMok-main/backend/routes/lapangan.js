const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM lapangan");
    res.json(data);
  } catch (err) {
    console.log("ERROR LAPANGAN:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;