const router = require("express").Router();
const db = require("../db");

// GET semua booking
router.get("/", (req, res) => {
  db.query("SELECT * FROM booking", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// POST booking
router.post("/", (req, res) => {
  const { user_id, lapangan_id, tanggal, jam } = req.body;

  db.query(
    "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?,?,?,?)",
    [user_id, lapangan_id, tanggal, jam],
    (err) => {
      if (err) return res.send(err);
      res.send("Booking berhasil");
    }
  );
});

module.exports = router;