const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== ROUTES ==================

// AUTH
app.use("/auth", require("./routes/auth"));

// LAPANGAN
app.use("/lapangan", require("./routes/lapangan"));

// JADWAL CRUD (ADMIN)
app.use("/jadwal", require("./routes/jadwal"));

// BOOKING
app.use("/booking", require("./routes/booking"));

// RIWAYAT
app.use("/riwayat", require("./routes/riwayat"));


// ================== API CEK JADWAL ==================
// (DIGANTI DARI /jadwal → /cek-jadwal BIAR TIDAK BENTROK)

app.get("/cek-jadwal", (req, res) => {
  const { lapangan_id, tanggal } = req.query;

  // VALIDASI INPUT
  if (!lapangan_id || !tanggal) {
    return res.status(400).json({
      status: "error",
      message: "lapangan_id dan tanggal wajib diisi"
    });
  }

  // AMBIL HARI
  const hari = new Date(tanggal).toLocaleDateString("id-ID", {
    weekday: "long"
  });

  db.query(
    `SELECT jam FROM booking 
     WHERE lapangan_id = ? AND tanggal = ?`,
    [lapangan_id, tanggal],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          status: "error",
          message: err
        });
      }

      // JAM OPERASIONAL
      const semuaJam = [
        "16:00:00",
        "17:00:00",
        "18:00:00",
        "19:00:00",
        "20:00:00",
        "21:00:00"
      ];

      // JAM YANG SUDAH DIBOOKING
      const jamTerbooking = result.map(r => r.jam);

      // FILTER JAM TERSEDIA
      const jamTersedia = semuaJam.filter(
        jam => !jamTerbooking.includes(jam)
      );

      res.status(200).json({
        status: "success",
        tanggal,
        hari,
        jam_terbooking: jamTerbooking,
        jam_tersedia: jamTersedia
      });
    }
  );
});


// ================== DEFAULT ROUTE ==================

app.get("/", (req, res) => {
  res.send("API Futsal Booking Jalan 🚀");
});


// ================== SERVER ==================

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});