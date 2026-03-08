-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2026 at 10:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lost_found`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'admin1', 'admin123', '2026-03-08 01:17:38');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` enum('Electronics','Laboratory Item','Personal Item') NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `item_date` date DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `photo_path` varchar(255) DEFAULT NULL,
  `status` enum('Lost','Found','Claimed') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `student_id`, `title`, `description`, `category`, `location`, `item_date`, `contact`, `photo_path`, `status`, `created_at`) VALUES
(1, 1, 'Power Bank', 'Dark blue Power Bank with yellow keychain.', 'Electronics', 'TTS, Level 3, The Curve', '2026-03-02', '018-2375667', '/uploads/1772931868125-Blue Powerbank.jpg', 'Lost', '2026-03-08 01:04:28'),
(2, 2, 'Cute Water Bottle', 'White Water Bottle with cute beads and rabbit design.', 'Personal Item', 'ASB, Level 1, Lounge', '2026-02-17', '012-5172337', '/uploads/1772933978489-Water Bottle.jpg', 'Found', '2026-03-08 01:39:38'),
(3, 1, 'Cute bear Keychain', 'A cute keychain with a clear bear charm.', 'Personal Item', 'ASB, Level 2, LR6', '2026-02-27', '019-2125247', '/uploads/1772941604229-Keychain Bear.jpg', 'Claimed', '2026-03-08 03:46:44'),
(4, 2, 'Headphone', 'A black and white wired headphone.', 'Electronics', 'ASB, Level 1, LR7', '2026-02-16', '019-2370881', '/uploads/1772957451715-earphone.jpeg', 'Lost', '2026-03-08 08:10:51');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'S12345', 'Sarah Amelia', 'Sarah.Amelia@edu.qiu.my', '$2b$10$L2TL85D/4f5f75RquHyp1egPrafeQGuIUMDCAK/ok6ezRq1kgcUMG', '2026-03-08 01:03:28'),
(2, 'S23456', 'Fatin Nur Hannah', 'Fatin.Hannah@edu.qiu.my', '$2b$10$StjaZJz00C7m9KEvdIBtLuhEqouSol5Sc5LjH7mi/evfkxrz6BJPu', '2026-03-08 01:36:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
