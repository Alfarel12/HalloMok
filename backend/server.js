const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/lapangan", require("./routes/lapangan"));
app.use("/booking", require("./routes/booking"));
app.use("/riwayat", require("./routes/riwayat")); 


app.listen(3000, () => 
  console.log("Server jalan di 3000"));


// API LIHAT JADWAL LAPANGAN
app.get("/jadwal", (req, res) => {

  const { lapangan_id, tanggal } = req.query;

  // ambil hari dari tanggal
  const hari = new Date(tanggal).toLocaleDateString("id-ID", {
    weekday: "long"
  });

  db.query(
    `SELECT jam FROM booking
     WHERE lapangan_id = ? AND tanggal = ?`,
    [lapangan_id, tanggal],
    (err, result) => {

      if (err) return res.send(err);

      // daftar jam yang tersedia
      const semuaJam = [
        "16:00:00",
        "17:00:00",
        "18:00:00",
        "19:00:00",
        "20:00:00",
        "21:00:00"
      ];

      // riwayat booking
      const jamTerbooking = result.map(r => r.jam);
      

      // jam yang masih tersedia
      const jamTersedia = semuaJam.filter(
        jam => !jamTerbooking.includes(jam)
      );

      res.json({
        tanggal: tanggal,
        hari: hari,
        jam_terbooking: jamTerbooking,
        jam_tersedia: jamTersedia
      });

    }
  );

});