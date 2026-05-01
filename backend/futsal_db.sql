-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Bulan Mei 2026 pada 13.46
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `futsal_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `lapangan_id` int(11) DEFAULT NULL,
  `tanggal` date NOT NULL,
  `jam` time NOT NULL,
  `status` varchar(20) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`id`, `user_id`, `lapangan_id`, `tanggal`, `jam`, `status`) VALUES
(5, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(6, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(7, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(8, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(9, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(10, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(11, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(12, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(13, 9, 1, '2026-04-15', '19:00:00', 'pending'),
(14, 9, 1, '2026-04-20', '19:00:00', 'pending'),
(15, 9, 2, '2026-04-20', '19:00:00', 'pending'),
(16, 9, 1, '2026-04-20', '18:00:00', 'pending'),
(17, 9, 1, '2026-04-20', '18:00:00', 'pending'),
(18, 9, 1, '2026-04-20', '18:00:00', 'pending'),
(19, 9, 2, '2026-04-20', '18:00:00', 'pending'),
(20, 9, 2, '2026-04-20', '17:00:00', 'pending'),
(22, 9, 1, '2026-04-20', '17:00:00', 'pending'),
(24, 9, 2, '2026-04-10', '15:00:00', 'pending'),
(32, 9, 1, '2026-04-25', '08:00:00', 'pending'),
(36, 15, 1, '2026-04-30', '18:00:00', 'pending'),
(37, 15, 1, '2026-04-30', '16:00:00', 'pending'),
(38, 18, 1, '2026-04-30', '17:00:00', 'pending'),
(39, 18, 2, '2026-04-30', '19:00:00', 'pending'),
(40, 19, 2, '2026-04-29', '20:00:00', 'pending'),
(41, 20, 1, '2026-05-03', '19:00:00', 'pending');

-- --------------------------------------------------------

--
-- Struktur dari tabel `lapangan`
--

CREATE TABLE `lapangan` (
  `id` int(11) NOT NULL,
  `nama_lapangan` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL,
  `deskripsi` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `lapangan`
--

INSERT INTO `lapangan` (`id`, `nama_lapangan`, `harga`, `deskripsi`) VALUES
(1, 'lapangan 1', 50000, 'Rumput sintetis, indoor'),
(2, 'lapangan 2', 60000, 'rumput sintetis, outdoor'),
(3, 'Lapangan VIP', 100000, 'Indoor premium'),
(4, 'Lapangan VIP', 100000, 'Indoor premium'),
(5, 'Lapangan VIP10', 200000, 'Indoor premium ber AC'),
(6, 'Lapangan VIP1', 300000, 'Indoor premium outdor');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `metode_pembayaran` varchar(50) DEFAULT NULL,
  `jumlah_bayar` int(11) DEFAULT NULL,
  `bukti_pembayaran` varchar(255) DEFAULT NULL,
  `status_pembayaran` enum('pending','lunas','gagal') DEFAULT 'pending',
  `tanggal_pembayaran` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  `username` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `email`, `password`, `role`, `username`) VALUES
(9, '', 'ammar@gmail.com', '$2b$10$yMA/XVeRZMXnMXoNSxdMguaHXGr1MxfWJkYv37KDbNH9geun91Nfe', 'admin', 'ammar'),
(11, 'acil', 'acil@gmail.com', '$2b$10$fD7mRC0RA7TOVn7uqU9hleXNQ59aZYGsCpeETYXSnsPKMeWBmC6S6', 'user', ''),
(12, 'dedi', 'dedi@gmail.com', '$2b$10$F5hkimVtLYWhQXJddFjBY.F7t78ziOey9mn.MUcCfMoPRPjKt1S2S', 'user', ''),
(13, 'ayeng', 'ayeng@gmail.com', '$2b$10$kZRIM.2KlYZewEGhVTB9sOz58ujuyht3vChNKGIzV8OpL8Av1OvwG', 'user', ''),
(14, 'rafi', 'rafi@gmail.com', '$2b$10$l6Kx0w1PfS.U1yrUlUJ.9uLNtPht6LRBYQpTnv.pJ9kUBLoXkZ7jC', 'user', ''),
(15, 'putra', 'putra@gmail.com', '$2b$10$AP0OHc00Ku/nMHpInBfRTOxDpaO9MB7MISjTdp97JCLF8SWZXP33i', 'user', ''),
(16, 'mandrok', 'abang@gmail.com', '$2b$10$jwWTl84dRyB4vlokbp36we/xBEkzUrAo1NBIrGLczJA30TJBS3sPG', 'user', ''),
(17, 'puput', 'puput12@gmail.com', '$2b$10$23CqjImQmjS7Q2ljqLztc.0si8rkXl9vCy3jwEsO6lR/UaoVEKE06', 'user', ''),
(18, 'sintia', 'sintia12@gmail.com', '$2b$10$WLNt/hZds5izghpOR4L4NOwkotBg6sEWtowG2F/ZX38mXPgyQZKCe', 'user', ''),
(19, 'jono', 'jono12@gmail.com', '$2b$10$Woc1ZqtEUeoYa9zfqbuqQ.v5BsS5kma67exW19dxr.tIKFt25XR9e', 'user', ''),
(20, 'tuti', 'tuti20@gmail.com', '$2b$10$wMmtIQtgei6.FyqzMxjZWOacY/4gk.uyH6CH1iUsp1XmgBApiPgYe', 'user', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `lapangan_id` (`lapangan_id`);

--
-- Indeks untuk tabel `lapangan`
--
ALTER TABLE `lapangan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT untuk tabel `lapangan`
--
ALTER TABLE `lapangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`lapangan_id`) REFERENCES `lapangan` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
