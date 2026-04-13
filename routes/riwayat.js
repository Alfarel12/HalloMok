const router = require("express").Router();
const db = require("../db");

// helper status
function getStatus(tanggal, jam) {
  try {
    const now = new Date();
    const bookingTime = new Date(`${tanggal}T${jam}`); // 🔥 FIX format ISO

    if (isNaN(bookingTime)) return "unknown";

    return bookingTime < now ? "selesai" : "upcoming";
  } catch {
    return "unknown";
  }
}

// GET riwayat by tanggal
router.get("/tanggal/:tanggal", async (req, res) => {
  try {
    const { tanggal } = req.params;

    const [result] = await db.query(
      `SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
       FROM booking
       JOIN lapangan ON booking.lapangan_id = lapangan.id
       WHERE DATE(booking.tanggal) = ?
       ORDER BY booking.jam ASC`,
      [tanggal]
    );

    const data = (result || []).map((item) => ({
      id: item.id,
      tanggal: item.tanggal,
      hari: new Date(item.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
      }),
      jam: item.jam,
      lapangan: item.nama_lapangan,
      status: getStatus(item.tanggal, item.jam),
    }));

    res.json({
      tanggal,
      total: data.length,
      riwayat: data,
    });

  } catch (err) {
    console.log("ERROR RIWAYAT TANGGAL:", err); //  WAJIB
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET riwayat by user
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const [result] = await db.query(
      `SELECT
        booking.id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
      FROM booking
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      WHERE booking.user_id = ?
      ORDER BY booking.tanggal DESC, booking.jam DESC`,
      [user_id]
    );

    res.json({
      message: "Berhasil ambil riwayat",
      data: result,
    });

  } catch (err) {
    console.log("ERROR RIWAYAT USER:", err); //  WAJIB
    res.status(500).json({ message: "Error server", error: err.message });
  }
});

module.exports = router;