const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", require("./routes/auth"));
app.use("/lapangan", require("./routes/lapangan"));
app.use("/booking", require("./routes/booking"));
app.use("/riwayat", require("./routes/riwayat")); 
app.use("/jadwal", require("./routes/jadwal"));

app.listen(3000, () => {
  console.log("Server jalan di 3000");
});