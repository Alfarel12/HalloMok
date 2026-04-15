const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  const { nama, email, password } = req.body;

  try {
    // cek email udah ada belum
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    await db.query(
      "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
      [nama, email, hashedPassword]
    );

    res.json({
      message: "Register berhasil",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;