const router = require("express").Router();
const db = require("../db");

// helper status booking
function getStatus(tanggal, jam) {
  const now = new Date();
  const bookingTime = new Date(`${tanggal} ${jam}`);
  return bookingTime < now ? "selesai" : "upcoming";
}

// ✅ GET semua riwayat booking
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
      FROM booking
      JOIN lapangan ON booking.lapangan_id = lapangan.id
      ORDER BY booking.tanggal DESC, booking.jam DESC
    `);

    const data = result.map((item) => ({
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
      total: data.length,
      riwayat: data,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ GET riwayat by tanggal
router.get("/tanggal/:tanggal", async (req, res) => {
  const { tanggal } = req.params;

  try {
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

    const data = result.map((item) => ({
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
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;