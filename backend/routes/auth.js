const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");


// ================== LOGIN (GET - BISA DI BROWSER) ==================
router.get("/login", async (req, res) => {
  const { email, password } = req.query;

  // kalau belum isi query
  if (!email || !password) {
    return res.send(`
      <h2>Login API</h2>
      <p>Gunakan format:</p>
      <code>/auth/login?email=xxx&password=xxx</code>
    `);
  }

  try {
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.json({ message: "Email tidak ditemukan" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user[0].password
    );

    if (!validPassword) {
      return res.json({ message: "Password salah" });
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
    res.json({ message: "Server error" });
  }
});


// ================== LOGIN (POST - BEST PRACTICE) ==================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({
        message: "Email tidak ditemukan",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user[0].password
    );

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