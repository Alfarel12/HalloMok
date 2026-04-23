const db = require("../db");

exports.createBooking = async (req, res) => {
  const { user_id, service_id, date } = req.body;

  if (!user_id || !service_id || !date) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [user_id]);
    if (user.length === 0) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    const [service] = await db.query("SELECT * FROM services WHERE id = ?", [service_id]);
    if (service.length === 0) {
      return res.status(400).json({ message: "Service tidak ditemukan" });
    }

    await db.query(
      "INSERT INTO bookings (user_id, service_id, date) VALUES (?, ?, ?)",
      [user_id, service_id, date]
    );

    res.status(201).json({ message: "Booking berhasil" });

  } catch (error) {
    console.error(error);

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({ message: "Foreign key tidak valid" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookingByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM bookings WHERE user_id = ?",
      [user_id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ message: "Gagal ambil data" });
  }
};