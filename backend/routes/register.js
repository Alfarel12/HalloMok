const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

const { success, error } = require("../utils/response");

// GET (tetap ada, ga dihapus)
router.get("/", (req, res) => {
  res.send("Endpoint register aktif. Gunakan POST untuk kirim data.");
});


// POST REGISTER
router.post("/", async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    // 🔍 VALIDASI INPUT
    if (!nama || !email || !password) {
      return error(res, "Semua field wajib diisi", 400);
    }

    if (!email.includes("@")) {
      return error(res, "Email tidak valid", 400);
    }

    if (password.length < 6) {
      return error(res, "Password minimal 6 karakter", 400);
    }

    // 🔍 CEK EMAIL SUDAH ADA
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length > 0) {
      return error(res, "Email sudah terdaftar", 400);
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 SIMPAN KE DATABASE
    await db.query(
      "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
      [nama, email, hashedPassword]
    );

    return success(res, null, "Register berhasil");

  } catch (err) {
    console.error("ERROR REGISTER:", err);
    return error(res, "Server error");
  }
});

module.exports = router;