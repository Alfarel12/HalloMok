const router = require("express").Router();
const db = require("../db");


// ✅ GET semua lapangan
router.get("/", (req, res) => {
  db.query("SELECT * FROM lapangan", (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: err
      });
    }

    res.status(200).json({
      status: "success",
      data: result
    });
  });
});


// ✅ POST tambah lapangan
router.post("/", (req, res) => {
  const { nama_lapangan, harga, deskripsi } = req.body;

  if (!nama_lapangan || !harga) {
    return res.status(400).json({
      status: "error",
      message: "Data tidak lengkap"
    });
  }

  db.query(
    "INSERT INTO lapangan (nama_lapangan, harga, deskripsi) VALUES (?, ?, ?)",
    [nama_lapangan, harga, deskripsi],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: err
        });
      }

      res.status(201).json({
        status: "success",
        message: "Lapangan berhasil ditambahkan"
      });
    }
  );
});

module.exports = router;