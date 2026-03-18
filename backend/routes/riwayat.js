const router = require("express").Router();
const db = require("../db");

// helper status booking
function getStatus(tanggal, jam) {
  const now = new Date();
  const bookingTime = new Date(`${tanggal} ${jam}`);

  return bookingTime < now ? "selesai" : "upcoming";
}

// GET semua riwayat booking
router.get("/", (req, res) => {
  db.query(
    `SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
     FROM booking

     JOIN lapangan ON booking.lapangan_id = lapangan.id
     ORDER BY booking.tanggal DESC, booking.jam DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);

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
    }
  );
});

module.exports = router;

// GET riwayat by tanggal
router.get("/tanggal/:tanggal", (req, res) => {
  const { tanggal } = req.params;

  db.query(
    `SELECT 
        booking.id,
        booking.tanggal,
        booking.jam,
        lapangan.nama_lapangan
     FROM booking
     JOIN lapangan ON booking.lapangan_id = lapangan.id
     WHERE DATE(booking.tanggal) = ?
     ORDER BY booking.jam ASC`,
    [tanggal],
    (err, result) => {
      if (err) return res.send(err);

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
    }
  );
});