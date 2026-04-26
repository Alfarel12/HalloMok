const express = require("express");
const router = express.Router();
const db = require("../db");
const { verifyToken } = require("../middleware/authMiddleware");


// ================== GET SEMUA BOOKING ==================
router.get("/", verifyToken, async (req, res) => {
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


// ================== GET BOOKING USER (LOGIN) ==================
router.get("/me", verifyToken, async (req, res) => {
  const user_id = req.user.id;

  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
      FROM booking
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      WHERE booking.user_id = ?
      ORDER BY booking.tanggal DESC
    `, [user_id]);

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
router.post("/", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id; // ambil dari token (AMAN)
    const { lapangan_id, tanggal, jam } = req.body;

    // VALIDASI INPUT
    if (!lapangan_id || !tanggal || !jam) {
      return res.status(400).json({
        status: "error",
        message: "Semua data wajib diisi"
      });
    }

    // CEK LAPANGAN
    const [lapangan] = await db.query(
      "SELECT id FROM lapangan WHERE id = ?",
      [lapangan_id]
    );

    if (lapangan.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Lapangan tidak ditemukan"
      });
    }

    // CEK JADWAL BENTROK
    const [cek] = await db.query(
      "SELECT id FROM booking WHERE lapangan_id = ? AND tanggal = ? AND jam = ?",
      [lapangan_id, tanggal, jam]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "Jadwal sudah dibooking"
      });
    }

    // INSERT
    await db.query(
      "INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?, ?, ?, ?)",
      [user_id, lapangan_id, tanggal, jam]
    );

    res.status(201).json({
      status: "success",
      message: "Booking berhasil disimpan"
    });

  } catch (err) {
    console.error("ERROR BOOKING:", err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        status: "error",
        message: "Relasi data tidak valid (foreign key error)"
      });
    }

    res.status(500).json({
      status: "error",
      message: "Server error"
    });
  }
});

module.exports = router;