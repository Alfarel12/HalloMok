const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // cek user
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(400).json({
        message: "Email tidak ditemukan",
      });
    }

    if (!user[0].password.startsWith("$2b$")) {
  return res.status(500).json({
    message: "Password belum di-hash, data invalid"
  });
}

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Password salah",
      });
    }

    res.json({
      message: "Login berhasil",
      user: {
        id: user[0].id,
        nama: user[0].nama,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;