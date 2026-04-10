const router = require("express").Router();
const db = require("../db");

// ✅ GET semua booking
router.get("/", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM booking");
    res.json(data);
  } catch (err) {
    console.log("ERROR GET BOOKING:", err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST booking
router.post("/", async (req, res) => {
  const { user_id, lapangan_id, tanggal, jam } = req.body;

  if (!user_id || !lapangan_id || !tanggal || !jam) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    await db.query(
      "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?,?,?,?)",
      [user_id, lapangan_id, tanggal, jam]
    );

    res.json({ message: "Booking berhasil" });

  } catch (err) {
    console.log("ERROR POST BOOKING:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;