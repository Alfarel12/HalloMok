const express = require("express");
const router = express.Router();
const multer = require("multer");

const { success, error } = require("../utils/response");

// 🔧 STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// 🔒 VALIDASI FILE
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File harus berupa gambar (jpg/png)"), false);
  }
};

// 🚫 BATAS SIZE
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

// ✅ ENDPOINT UPLOAD
router.post("/", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return error(res, "File tidak ditemukan", 400);
    }

    return success(res, {
      filename: req.file.filename,
      url: `http://localhost:3000/uploads/${req.file.filename}`
    }, "Upload berhasil");

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return error(res, err.message);
  }
});

module.exports = router;