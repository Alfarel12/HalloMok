const express = require("express");
const router = express.Router();
const db = require("../db");

// ================== GET BOOKING ==================
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        users.nama AS nama_user,
        lapangan.nama_lapangan
      FROM booking
      JOIN users ON booking.user_id = users.id
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      ORDER BY booking.tanggal DESC
    `);

    res.status(200).json({
      status: "success",
      total: result.length,
      data: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});


// ================== POST BOOKING ==================
router.post("/", async (req, res) => {
  try {
    const { user_id, lapangan_id, tanggal, jam } = req.body;

    // VALIDASI
    if (!user_id || !lapangan_id || !tanggal || !jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi"
      });
    }

    // CEK USER
    const [user] = await db.query(
      "SELECT * FROM users WHERE id = ?",
      [user_id]
    );

    if (user.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "User tidak ditemukan"
      });
    }

    // CEK LAPANGAN
    const [lapangan] = await db.query(
      "SELECT * FROM lapangan WHERE id = ?",
      [lapangan_id]
    );

    if (lapangan.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Lapangan tidak ditemukan"
      });
    }

    // CEK BENTROK
    const [cek] = await db.query(
      "SELECT * FROM booking WHERE lapangan_id = ? AND tanggal = ? AND jam = ?",
      [lapangan_id, tanggal, jam]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Jadwal sudah dibooking"
      });
    }

    // INSERT KE DATABASE
    await db.query(
      "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?, ?, ?, ?)",
      [user_id, lapangan_id, tanggal, jam]
    );

    res.status(201).json({
      status: "success",
      message: "Booking berhasil disimpan"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

module.exports = router;