const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// 🔥 LOG REQUEST (biar gampang debug)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ================= ROUTES =================
app.use("/auth", require("./routes/auth"));
app.use("/lapangan", require("./routes/lapangan"));
app.use("/booking", require("./routes/booking"));
app.use("/riwayat", require("./routes/riwayat"));  
app.use("/jadwal", require("./routes/jadwal"));
app.use("/register", require("./routes/register"));

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("API Futsal Booking Jalan ");
});

// ================= HANDLE ROUTE TIDAK ADA =================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route tidak ditemukan"
  });
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server"
  });
});

// ================= SERVER =================
app.listen(3000, () => {
  console.log("Server jalan di 3000");
});