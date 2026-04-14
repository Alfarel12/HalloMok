const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ TEST DI BROWSER (biar ga "Cannot GET /booking")
router.get("/", (req, res) => {
  res.send("Endpoint booking aktif 🚀");
});


// ✅ POST BOOKING
router.post("/", async (req, res) => {
  try {
    console.log("BODY MASUK:", req.body);

    const { user_id, lapangan_id, tanggal, jam } = req.body;

    // VALIDASI
    if (!user_id || !lapangan_id || !tanggal || !jam) {
      return res.status(400).json({
        message: "Data tidak lengkap",
      });
    }

    // CEK USER
    const [user] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [user_id]
    );

    if (user.length === 0) {
      return res.status(400).json({
        message: "User tidak ditemukan",
      });
    }

    // CEK LAPANGAN
    const [lapangan] = await db.query(
      "SELECT * FROM lapangan WHERE id = ?",
      [lapangan_id]
    );

    if (lapangan.length === 0) {
      return res.status(400).json({
        message: "Lapangan tidak ditemukan",
      });
    }

    // CEK JADWAL BENTROK
    const [cek] = await db.query(
      "SELECT * FROM booking WHERE lapangan_id = ? AND tanggal = ? AND jam = ?",
      [lapangan_id, tanggal, jam]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        message: "Jadwal sudah dibooking",
      });
    }

    // INSERT
    await db.query(
      "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?, ?, ?, ?)",
      [user_id, lapangan_id, tanggal, jam]
    );

    res.status(201).json({
      message: "Booking berhasil ditambahkan",
    });

  } catch (err) {
    console.error("ERROR ASLI:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;