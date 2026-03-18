const router = require("express").Router();
const db = require("../db");

// TEST (opsional)
router.get("/test", (req, res) => {
  res.send("riwayat hidup");
});

// GET riwayat booking berdasarkan user
router.get("/:user_id", (req, res) => {
  const { user_id } = req.params; // ⬅️ WAJIB ADA

  db.query(
    `SELECT booking.*, users.nama, lapangan.nama_lapangan
     FROM booking
     JOIN users ON booking.user_id = users.id
     JOIN lapangan ON booking.lapangan_id = lapangan.id
     WHERE booking.user_id = ?
     ORDER BY booking.tanggal DESC`,
    [user_id],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

module.exports = router;