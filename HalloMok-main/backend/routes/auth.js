console.log("AUTH KELOAD");
const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("AUTH HIDUP");
});

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Semua field wajib diisi"
      });
    }

    // cek email
    const [cek] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (cek.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash]
    );

    res.json({ message: "Register berhasil" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({
        message: "User tidak ditemukan"
      });
    }

    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(400).json({
        message: "Password salah"
      });
    }

    res.json({
      message: "Login berhasil",
      user: user[0]
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;