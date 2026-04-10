const router = require("express").Router();
const db = require("../db");

router.get("/", async (req, res) => {
  console.log("MASUK JADWAL"); // debug

  const { tanggal, lapangan_id } = req.query;

  // 🔒 biar gak pending kalau kosong
  if (!tanggal || !lapangan_id) {
    return res.status(400).json({
      message: "tanggal dan lapangan_id wajib diisi"
    });
  }

  try {
    console.log("QUERY JALAN");

    const [result] = await db.query(
      "SELECT jam FROM booking WHERE tanggal=? AND lapangan_id=?",
      [tanggal, lapangan_id]
    );

    console.log("HASIL:", result);

    const semuaJam = [
      "16:00:00",
      "17:00:00",
      "18:00:00",
      "19:00:00",
      "20:00:00",
      "21:00:00"
    ];

    const jamTerbooking = result.map(r => r.jam);

    const jamTersedia = semuaJam.filter(
      jam => !jamTerbooking.includes(jam)
    );

    res.json({
      tanggal,
      hari: new Date(tanggal).toLocaleDateString("id-ID", {
        weekday: "long"
      }),
      jam_terbooking: jamTerbooking,
      jam_tersedia: jamTersedia
    });

  } catch (err) {
    console.log("ERROR JADWAL:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;