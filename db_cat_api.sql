-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2025 at 03:08 PM
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
-- Database: `db_cat_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `cats`
--

CREATE TABLE `cats` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cats`
--

INSERT INTO `cats` (`id`, `name`, `description`, `image_url`) VALUES
(1, 'Whiskers', 'Friendly and playful', 'https://i.postimg.cc/jdXT3n8q/cat1-2.png'),
(2, 'Mittens', 'Loves cuddles', 'https://i.postimg.cc/sDrnJ8PF/cat2-2.png'),
(3, 'Poppy', 'Likes to drink your tea', 'https://i.postimg.cc/mD1ddW64/cat3.png'),
(4, 'Zinn', 'King of the castle', 'https://i.postimg.cc/ncG3SkTX/cat5.png'),
(5, 'Hamish', 'Scaredy cat all the way', 'https://i.postimg.cc/nhV0yDw0/cat4.png'),
(6, 'Bonkers', 'Definitely bonkers', 'https://i.postimg.cc/9XT8ZV7t/cat6.png'),
(7, 'Lilly', 'As gentle as a flower', 'https://i.postimg.cc/QCDqzp1N/cat7.png'),
(8, 'Morritz', 'Our dear old man', 'https://i.postimg.cc/Hntt1V9w/cat8.png'),
(9, 'Frank', 'Secretly a human', 'https://i.postimg.cc/XqDkYttq/cat9.png'),
(10, 'Bozko', 'Fun and sweet', 'https://i.postimg.cc/8zBTtddC/Chat-GPT-Image-May-4-2025-11-06-07-AM.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
