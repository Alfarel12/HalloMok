const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    console.log("BODY MASUK:", req.body); // 🔥 debug

    const { user_id, lapangan_id, tanggal, jam } = req.body;

    // validasi
    if (!user_id || !lapangan_id || !tanggal || !jam) {
      return res.status(400).json({
        message: "Data tidak lengkap",
      });
    }

    // cek lapangan ada atau tidak
    const [lapangan] = await db.query(
      "SELECT * FROM lapangan WHERE id = ?",
      [lapangan_id]
    );

    if (lapangan.length === 0) {
      return res.status(400).json({
        message: "Lapangan tidak ditemukan",
      });
    }

    // insert booking
    await db.query(
      "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?, ?, ?, ?)",
      [user_id, lapangan_id, tanggal, jam]
    );

    res.json({
      message: "Booking berhasil ditambahkan",
    });

  } catch (err) {
    console.error("ERROR ASLI:", err); // 
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;