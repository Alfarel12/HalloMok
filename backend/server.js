const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/lapangan", require("./routes/lapangan"));
app.use("/booking", require("./routes/booking"));

app.listen(3000, () => console.log("Server jalan di 3000"));

// API LIHAT JADWAL LAPANGAN
app.get("/jadwal", (req, res) => {
  const { lapangan_id, tanggal } = req.query;

  db.query(
    `SELECT booking.*, users.nama, lapangan.nama_lapangan 
     FROM booking
     JOIN users ON booking.user_id = users.id
     JOIN lapangan ON booking.lapangan_id = lapangan.id
     WHERE booking.lapangan_id = ? AND booking.tanggal = ?`,
    [lapangan_id, tanggal],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});