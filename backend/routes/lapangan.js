const router = require("express").Router();
const db = require("../db");
const { success, error } = require("../utils/response");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");


// ================= GET (USER + ADMIN) =================
router.get("/", verifyToken, async (req, res) => {
  try {

    const [data] = await db.query(
      "SELECT * FROM lapangan"
    );

    if (data.length === 0) {
      return error(
        res,
        "Data lapangan kosong",
        404
      );
    }

    return success(
      res,
      data,
      "Data lapangan berhasil diambil"
    );

  } catch (err) {

    console.log("ERROR LAPANGAN:", err);

    return error(
      res,
      err.message
    );
  }
});


// ================= POST (ADMIN ONLY) =================
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {

    const {
      nama_lapangan,
      harga,
      deskripsi
    } = req.body;

    if (!nama_lapangan || !harga) {
      return error(
        res,
        "nama_lapangan dan harga wajib diisi",
        400
      );
    }

    await db.query(
      `INSERT INTO lapangan
      (nama_lapangan,harga,deskripsi)
      VALUES (?,?,?)`,
      [
        nama_lapangan,
        harga,
        deskripsi
      ]
    );

    return success(
      res,
      null,
      "Lapangan berhasil ditambahkan"
    );

  } catch (err) {

    console.log("ERROR POST LAPANGAN:", err);

    return error(
      res,
      err.message
    );
  }
});


// ================= DELETE (ADMIN ONLY) =================
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return error(
        res,
        "ID wajib diisi",
        400
      );
    }

    const [cek] = await db.query(
      "SELECT * FROM lapangan WHERE id = ?",
      [id]
    );

    if (cek.length === 0) {
      return error(
        res,
        "Lapangan tidak ditemukan",
        404
      );
    }

    await db.query(
      "DELETE FROM lapangan WHERE id = ?",
      [id]
    );

    return success(
      res,
      null,
      "Lapangan berhasil dihapus"
    );

  } catch (err) {

    console.log("ERROR DELETE LAPANGAN:", err);

    return error(
      res,
      err.message
    );
  }
});


module.exports = router;