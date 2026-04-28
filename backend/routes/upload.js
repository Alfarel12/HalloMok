const express = require("express");
const router = express.Router();
const multer = require("multer");

const { success, error } = require("../utils/response");

// ================= STORAGE =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ================= VALIDASI FILE =================
const fileFilter = (req, file, cb) => {

  // hanya jpg/png
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);

  } else {
    cb(new Error("File harus berupa gambar JPG/PNG"), false);
  }
};

// ================= SETUP MULTER =================
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,

  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});


// ================= GET TEST =================
router.get("/", (req, res) => {
  res.send("Upload endpoint aktif");
});


// ================= POST UPLOAD =================
router.post("/", (req, res) => {

  // jalankan upload
  upload.single("file")(req, res, (err) => {

    // ❌ ERROR MULTER
    if (err) {

      console.error("MULTER ERROR:", err);

      return error(res, err.message, 400);
    }

    // ❌ FILE KOSONG
    if (!req.file) {

      return error(res, "File tidak ditemukan", 400);
    }

    // ✅ SUKSES
    return success(
      res,
      {
        filename: req.file.filename,

        url: `http://localhost:3000/uploads/${req.file.filename}`
      },

      "Upload berhasil"
    );
  });
});

module.exports = router;