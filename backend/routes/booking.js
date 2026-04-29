const router = require("express").Router();
const db = require("../db");

// GET semua booking
router.get("/", (req, res) => {
  db.query("SELECT * FROM booking", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// POST booking

router.post('/', (req, res) => {
    const { user_id, lapangan_id, tanggal, jam } = req.body;

    // 1. Validasi User
    db.query('SELECT * FROM users WHERE id = ?', [user_id], (err, userResults) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (userResults.length === 0) {
            return res.status(400).json({ message: "User tidak ditemukan!" });
        }

        // 2. Validasi Lapangan (Bagian Lapangan Anda)
        db.query('SELECT * FROM lapangan WHERE id = ?', [lapangan_id], (err, lapResults) => {
            if (err) return res.status(500).json({ message: "Server error" });
            if (lapResults.length === 0) {
                return res.status(400).json({ message: "Lapangan tidak ditemukan!" });
            }

            // 3. Jika User & Lapangan Valid, baru INSERT
            const queryInsert = 'INSERT INTO booking (user_id, lapangan_id, tanggal, jam) VALUES (?, ?, ?, ?)';
            db.query(queryInsert, [user_id, lapangan_id, tanggal, jam], (err, result) => {
                if (err) return res.status(500).json({ message: "Gagal membuat booking" });
                res.json({ status: "success", message: "Booking berhasil dibuat!" });
            });
        });
    });
});

module.exports = router;