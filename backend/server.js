const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ✅ STATIC FILE (WAJIB)
app.use("/uploads", express.static("public/uploads"));


// ================= DEBUG =================
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

// ✅ FIX UPLOAD
const uploadRoute = require("./routes/upload");
app.use("/upload", uploadRoute.router);


// ================= ROOT =================
app.get("/", (req, res) => {
  res.json({
    message: "API Futsal Booking Jalan 🚀"
  });
});


// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route tidak ditemukan"
  });
});


// ================= GLOBAL ERROR =================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  if (err.message && err.message.includes("File")) {
    return res.status(400).json({
      status: "error",
      message: err.message
    });
  }

  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server"
  });
});


// ================= SERVER =================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});