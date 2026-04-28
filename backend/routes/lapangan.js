const router = require("express").Router();
const db = require("../db");
const { success, error } = require("../utils/response");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ambil upload
const { upload } = require("./upload");

router.get("/", (req, res) => {
  res.send("Lapangan route aktif");
});
// ================= POST =================
router.post("/", verifyToken, isAdmin, upload.single("foto"), async (req, res) => {
  try {

    const { nama_lapangan, harga, deskripsi } = req.body;

    if (!nama_lapangan || !harga) {
      return error(res, "nama_lapangan dan harga wajib diisi", 400);
    }

    const fotoPath = req.file
      ? req.file.path.replace(/\\/g, "/")
      : null;

    await db.query(
      `INSERT INTO lapangan (nama_lapangan, harga, deskripsi, foto)
       VALUES (?, ?, ?, ?)`,
      [nama_lapangan, harga, deskripsi, fotoPath]
    );

    return success(res, { foto: fotoPath }, "Lapangan berhasil ditambahkan");

  } catch (err) {
    return error(res, err.message);
  }
});

module.exports = router;