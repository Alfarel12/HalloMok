const router = require("express").Router();
const db = require("../db");

// ambil jadwal berdasarkan tanggal dan lapangan
router.get("/", (req, res) => {

  const { tanggal, lapangan_id } = req.query;

  db.query(
    "SELECT jam FROM booking WHERE tanggal=? AND lapangan_id=?",
    [tanggal, lapangan_id],
    (err, result) => {
      if (err) return res.send(err);

      res.json({
        tanggal: tanggal,
        hari: new Date(tanggal).toLocaleDateString("id-ID", { weekday: "long" }),
        jam_terbooking: result
      });
    }
  );

});

module.exports = router;