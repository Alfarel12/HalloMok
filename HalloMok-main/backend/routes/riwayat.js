const router = require("express").Router();
const db = require("../db");

// ================== HELPER ==================
function getStatus(tanggal, jam) {
  const now = new Date();
  const bookingTime = new Date(`${tanggal} ${jam}`);
  return bookingTime < now ? "selesai" : "upcoming";
}

// ================== GET SEMUA RIWAYAT ==================
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.user_id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
      FROM booking
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      ORDER BY booking.tanggal DESC, booking.jam DESC
    `);

    const data = result.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      tanggal: item.tanggal,
      hari: new Date(item.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
      }),
      jam: item.jam,
      lapangan: item.nama_lapangan,
      status: getStatus(item.tanggal, item.jam),
    }));

    res.status(200).json({
      status: "success",
      total: data.length,
      data,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});


// ================== GET RIWAYAT BY USER ==================
router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const [result] = await db.query(
      `SELECT 
        booking.id,
        booking.user_id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
       FROM booking
       JOIN lapangan ON booking.lapangan_id = lapangan.id
       WHERE booking.user_id = ?
       ORDER BY booking.tanggal DESC`,
      [user_id]
    );

    const data = result.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      tanggal: item.tanggal,
      hari: new Date(item.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
      }),
      jam: item.jam,
      lapangan: item.nama_lapangan,
      status: getStatus(item.tanggal, item.jam),
    }));

    res.status(200).json({
      status: "success",
      user_id,
      total: data.length,
      data,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});


// ================== GET RIWAYAT BY TANGGAL ==================
router.get("/tanggal/:tanggal", async (req, res) => {
  const { tanggal } = req.params;

  try {
    const [result] = await db.query(
      `SELECT 
        booking.id,
        booking.user_id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
       FROM booking
       JOIN lapangan ON booking.lapangan_id = lapangan.id
       WHERE DATE(booking.tanggal) = ?
       ORDER BY booking.jam ASC`,
      [tanggal]
    );

    const data = result.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      tanggal: item.tanggal,
      hari: new Date(item.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
      }),
      jam: item.jam,
      lapangan: item.nama_lapangan,
      status: getStatus(item.tanggal, item.jam),
    }));

    res.status(200).json({
      status: "success",
      tanggal,
      total: data.length,
      data,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
});

module.exports = router;