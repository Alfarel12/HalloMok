const express = require("express");
const router = express.Router();
const multer = require("multer");
const { success, error } = require("../utils/response");

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// FILTER
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File harus JPG/PNG"), false);
  }
};

// MULTER
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});

// TEST
router.get("/", (req, res) => {
  res.send("Upload endpoint aktif");
});

// UPLOAD
router.post("/", (req, res) => {
  upload.single("file")(req, res, (err) => {

    if (err) {
      return error(res, err.message, 400);
    }

    if (!req.file) {
      return error(res, "File tidak ditemukan", 400);
    }

    return success(res, {
      filename: req.file.filename,
      url: `http://localhost:3000/uploads/${req.file.filename}`
    }, "Upload berhasil");
  });
});

// ✅ PENTING
module.exports = {
  router,
  upload
};