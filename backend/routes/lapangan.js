const router = require("express").Router();
const db = require("../db");
const { success, error } = require("../utils/response");


// ================= GET =================
router.get("/", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM lapangan");

    if (data.length === 0) {
      return error(res, "Data lapangan kosong", 404);
    }

    // 🔥 tetap fungsi lama, tapi pakai format baru
    return success(res, data, "Data lapangan berhasil diambil");

  } catch (err) {
    console.log("ERROR LAPANGAN:", err);
    return error(res, err.message);
  }
});


// ================= POST =================
router.post("/", async (req, res) => {
  try {
    const { nama_lapangan, harga, deskripsi } = req.body;

    // VALIDASI
    if (!nama_lapangan || !harga) {
      return error(res, "nama_lapangan dan harga wajib diisi", 400);
    }

    await db.query(
      "INSERT INTO lapangan (nama_lapangan, harga, deskripsi) VALUES (?, ?, ?)",
      [nama_lapangan, harga, deskripsi]
    );

    return success(res, null, "Lapangan berhasil ditambahkan");

  } catch (err) {
    console.log("ERROR POST LAPANGAN:", err);
    return error(res, err.message);
  }
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // VALIDASI
    if (!id) {
      return error(res, "ID wajib diisi", 400);
    }

    // CEK DATA ADA
    const [cek] = await db.query(
      "SELECT * FROM lapangan WHERE id = ?",
      [id]
    );

    if (cek.length === 0) {
      return error(res, "Lapangan tidak ditemukan", 404);
    }

    await db.query(
      "DELETE FROM lapangan WHERE id = ?",
      [id]
    );

    return success(res, null, "Lapangan berhasil dihapus");

  } catch (err) {
    console.log("ERROR DELETE LAPANGAN:", err);
    return error(res, err.message);
  }
});


// ================= EXPORT =================
module.exports = router;