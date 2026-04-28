const express = require('express')
const router = express.Router()
const db = require('../db')

// GET semua lapangan
router.get('/', (req, res) => {
  db.query('SELECT * FROM lapangan', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

// GET lapangan berdasarkan ID
router.get('/:id', (req, res) => {
  const id = req.params.id

  db.query('SELECT * FROM lapangan WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

// POST tambah lapangan
router.post('/', (req, res) => {
  const { nama, harga } = req.body

  if (!nama || !harga) {
    return res.status(400).json({ message: 'Nama dan harga harus diisi' })
  }

  db.query(
    'INSERT INTO lapangan (nama, harga) VALUES (?, ?)',
    [nama, harga],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: 'Lapangan berhasil ditambahkan' })
    }
  )
})

// PUT update lapangan
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { nama, harga } = req.body

  db.query(
    'UPDATE lapangan SET nama = ?, harga = ? WHERE id = ?',
    [nama, harga, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: 'Lapangan berhasil diupdate' })
    }
  )
})

// DELETE lapangan
router.delete('/:id', (req, res) => {
  const id = req.params.id

  db.query('DELETE FROM lapangan WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json({ message: 'Lapangan berhasil dihapus' })
  })
})

module.exports = router
