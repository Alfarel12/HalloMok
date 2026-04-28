const express = require('express')
const router = express.Router()
const db = require('../db')

// GET semua jadwal
router.get('/', (req, res) => {
  db.query(
    `SELECT jadwal.id, jadwal.tanggal, jadwal.jam,
            lapangan.nama_lapangan AS nama_lapangan
     FROM jadwal
     LEFT JOIN lapangan ON jadwal.lapangan_id = lapangan.id`,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Gagal mengambil data jadwal',
          error: err
        })
      }

      res.json(result)
    }
  )
})

// GET jadwal by id
router.get('/:id', (req, res) => {
  const id = req.params.id

  db.query(
    `SELECT * FROM jadwal WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Gagal mengambil jadwal',
          error: err
        })
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: 'Jadwal tidak ditemukan'
        })
      }

      res.json(result[0])
    }
  )
})

// POST tambah jadwal
router.post('/', (req, res) => {
  const { lapangan_id, tanggal, jam } = req.body

  if (!lapangan_id || !tanggal || !jam) {
    return res.status(400).json({
      message: 'Semua field wajib diisi'
    })
  }

  db.query(
    'INSERT INTO jadwal (lapangan_id, tanggal, jam) VALUES (?, ?, ?)',
    [lapangan_id, tanggal, jam],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Gagal menambahkan jadwal',
          error: err
        })
      }

      res.status(201).json({
        message: 'Jadwal berhasil ditambahkan',
        id: result.insertId
      })
    }
  )
})

// PUT update jadwal
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { lapangan_id, tanggal, jam } = req.body

  if (!lapangan_id || !tanggal || !jam) {
    return res.status(400).json({
      message: 'Semua field wajib diisi'
    })
  }

  db.query(
    'UPDATE jadwal SET lapangan_id = ?, tanggal = ?, jam = ? WHERE id = ?',
    [lapangan_id, tanggal, jam, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Gagal update jadwal',
          error: err
        })
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Jadwal tidak ditemukan'
        })
      }

      res.json({
        message: 'Jadwal berhasil diupdate'
      })
    }
  )
})

// DELETE jadwal
router.delete('/:id', (req, res) => {
  const id = req.params.id

  db.query(
    'DELETE FROM jadwal WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'Gagal menghapus jadwal',
          error: err
        })
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Jadwal tidak ditemukan'
        })
      }

      res.json({
        message: 'Jadwal berhasil dihapus'
      })
    }
  )
})

module.exports = router
