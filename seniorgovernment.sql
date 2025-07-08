-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2025 at 04:22 PM
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
-- Database: `seniorgovernment`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `oscaID` int(250) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `role` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`oscaID`, `firstname`, `middlename`, `surname`, `birthday`, `age`, `gender`, `contact_number`, `role`, `address`, `image`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'XXXX', 'XXX', 'CCCC', '1998-12-13', 25, 'Male', '0951352312', 'Admin', 'Matic', '/profile/2.png', 'Lleelee', '$2y$10$4fk5Juxdp8RygUhFyErLjOIru9Ov6hjdDF.nHlBF6PYNaoj.HzJRm', '2024-12-01 15:53:41', '2024-12-01 15:53:41'),
(2, 'maddi', 'son', 'gurl', '1996-09-12', 28, 'Male', '0951352312', 'Admin', 'SSSDDS', '/profile/1.png', 'Maddison', '$2y$10$MnYZeDj8btqvm82csI6TCOsgf7AreNAid2sdyKQLGnu9.NTamxdp2', '2024-12-01 15:54:35', '2024-12-01 16:29:43'),
(3, 'Julliet', 'Minnette', 'Minnesson', '1991-09-18', 33, 'Male', '0951352312', 'Admin', 'FDFFD', '/profile/2.png', 'Julian', '$2y$10$wtbPc3Bf2KY4rEm1DFuHq.vaK0yl6cXnieD8ZaIJwBh/aJ/O.R/eu', '2024-12-03 15:44:07', '2024-12-03 15:44:07'),
(4, 'Amihan', 'Sasutana', 'Cruz', '2003-02-28', 21, 'Male', '09943431451', 'Admin', '481 N. Cruz St', '/profile/tatak-it-tatak-plp-0d97584b-1304-44a4-b602-3f05125d32fc.jpg', 'amihan', '$2y$10$QnN3zE.WmkONcuEjNjqbH.7nrMoI0RVVR1UJmKXnU3zYbcbFuPGWW', '2024-12-03 16:08:39', '2025-07-03 00:50:31'),
(5, 'King Jorem', 'Banaag', 'Manggao', '1963-06-14', 61, 'Male', '+63951381211', 'Admin', '18 Velasquez Bagong Ilog', '/profile/1797597.png', 'jorem', '$2y$10$rTKWrLSM5DAW2VdkQL9rMulWb9Mm1fTfdrjLhF5Ep8nyOmbp7YvRK', '2025-03-11 09:54:05', '2025-03-11 09:54:05'),
(6, 'Amihan', 'Sasutana', 'Cruz', '2003-02-28', 22, 'Male', '0912345678', 'Admin', '481 N. Cruz St', '/profile/PLP-Transparent Logo.png', 'test123', '$2y$10$nFRQYUJWbzgQ/0UK4vK3CegqJt2lnvYU8ir7JeUByLpsuwqOh6fme', '2025-07-03 00:54:06', '2025-07-03 00:54:06');

-- --------------------------------------------------------

--
-- Table structure for table `affilation`
--

CREATE TABLE `affilation` (
  `affilNo` int(11) NOT NULL,
  `affilDesc` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `affilation`
--

INSERT INTO `affilation` (`affilNo`, `affilDesc`) VALUES
(1, 'Listahan'),
(2, 'Indigenous People'),
(3, 'Pantawid Beneficiary'),
(4, 'Senior Citizen Organization');

-- --------------------------------------------------------

--
-- Table structure for table `bin_dswd`
--

CREATE TABLE `bin_dswd` (
  `oscaID` int(11) NOT NULL,
  `seniorAffilNo` int(11) NOT NULL,
  `lastName` varchar(250) DEFAULT NULL,
  `firstName` varchar(250) DEFAULT NULL,
  `middleName` varchar(250) DEFAULT NULL,
  `suffix` varchar(250) DEFAULT NULL,
  `age` int(5) DEFAULT NULL,
  `gender` varchar(250) DEFAULT NULL,
  `civilStat` varchar(250) DEFAULT NULL,
  `religion` varchar(250) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `placeOfBirth` varchar(250) DEFAULT NULL,
  `educAttain` varchar(250) DEFAULT NULL,
  `famName` varchar(250) DEFAULT NULL,
  `famRelation` varchar(250) DEFAULT NULL,
  `famAge` int(5) DEFAULT NULL,
  `famCivilStat` varchar(250) DEFAULT NULL,
  `famOccu` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `livingArr` varchar(250) DEFAULT NULL,
  `tin` int(50) DEFAULT NULL,
  `philHealth` int(50) DEFAULT NULL,
  `dswdPensioner` varchar(250) DEFAULT NULL,
  `regSupport` varchar(250) DEFAULT NULL,
  `psource` varchar(250) DEFAULT NULL,
  `psource_desc` varchar(250) DEFAULT NULL,
  `famIncome` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bin_scc`
--

CREATE TABLE `bin_scc` (
  `oscaID` int(11) NOT NULL,
  `reqID` int(11) NOT NULL,
  `receiptNo` int(11) NOT NULL,
  `lastName` varchar(250) DEFAULT NULL,
  `firstName` varchar(250) DEFAULT NULL,
  `middleName` varchar(250) DEFAULT NULL,
  `gender` varchar(250) DEFAULT NULL,
  `age` int(5) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `placeOfBirth` varchar(250) DEFAULT NULL,
  `civilStat` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `contactNum` int(20) DEFAULT NULL,
  `payDate` date DEFAULT NULL,
  `amount` int(50) DEFAULT NULL,
  `payDesc` varchar(250) DEFAULT NULL,
  `modePay` varchar(250) DEFAULT NULL,
  `contrNum` int(50) DEFAULT NULL,
  `authorAgent` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `citizen`
--

CREATE TABLE `citizen` (
  `oscaID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `hashpassword` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `citizen`
--

INSERT INTO `citizen` (`oscaID`, `username`, `hashpassword`, `created_at`) VALUES
(1, 'Manny', '$2y$10$cnYjzlGZ4en./by7AornJeEo.f/ymtnoq0dDTBUpEVrwS6s20EIEG', '2024-12-03 15:37:55'),
(2, 'glenmore123', '$2y$10$WkKEglitscG5yLps9B5i0./6HrNBW0yUClorKofm2tfZlIhGYLq.6', '2024-12-03 15:59:09'),
(3, 'glenmore123', '$2y$10$8cDh6Ys7RaJPuyWiBENOGOugbqg.lszPjH1fIAcoLvf12ta07zaDy', '2024-12-03 16:02:07'),
(4, 'amihan', '$2y$10$Po9Vvq9Q1gMhBRqf7wH6ueYvcl4FB51lnjM0Fu2wNVpKV9NdaLSU.', '2024-12-03 16:06:57'),
(5, 'test123', '$2y$10$u0rbMyz8sOpbhWPRDsbmNu/Q4f6ZRxfRsT1Z0c2edGB7sTXzWltiG', '2025-07-03 00:52:09');

-- --------------------------------------------------------

--
-- Table structure for table `famcom`
--

CREATE TABLE `famcom` (
  `oscaID` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `relation` varchar(250) DEFAULT NULL,
  `age` int(5) DEFAULT NULL,
  `civilStat` varchar(250) DEFAULT NULL,
  `occupation` varchar(250) DEFAULT NULL,
  `income` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indiaffil`
--

CREATE TABLE `indiaffil` (
  `oscaID` int(11) NOT NULL,
  `indiDesc` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listahanaffil`
--

CREATE TABLE `listahanaffil` (
  `oscaID` int(11) NOT NULL,
  `listahanDesc` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `officers`
--

CREATE TABLE `officers` (
  `oscaID` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `position` varchar(250) DEFAULT NULL,
  `year` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `otheraffil`
--

CREATE TABLE `otheraffil` (
  `oscaID` int(11) NOT NULL,
  `otherDesc` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `receiptNo` int(11) NOT NULL,
  `oscaID` int(11) NOT NULL,
  `payDate` date DEFAULT NULL,
  `amount` int(50) DEFAULT NULL,
  `payDesc` varchar(250) DEFAULT NULL,
  `modePay` varchar(250) DEFAULT NULL,
  `balance` int(50) DEFAULT NULL,
  `authorAgent` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `reqID` int(11) NOT NULL,
  `req` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requirements`
--

INSERT INTO `requirements` (`reqID`, `req`) VALUES
(1, '1 x 1 ID Photo'),
(2, 'Annual Dues = Php 120'),
(3, 'Membership Fee = Php 50');

-- --------------------------------------------------------

--
-- Table structure for table `scinfo`
--

CREATE TABLE `scinfo` (
  `oscaID` int(11) NOT NULL,
  `lastName` varchar(250) DEFAULT NULL,
  `firstName` varchar(250) DEFAULT NULL,
  `middleName` varchar(250) DEFAULT NULL,
  `suffix` varchar(250) DEFAULT NULL,
  `gender` varchar(250) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `age` int(5) DEFAULT NULL,
  `placeOfBirth` varchar(250) DEFAULT NULL,
  `civilStat` varchar(250) DEFAULT NULL,
  `contactNum` int(20) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `religion` varchar(250) DEFAULT NULL,
  `citizenship` varchar(250) DEFAULT NULL,
  `educAttain` varchar(250) DEFAULT NULL,
  `tin` int(50) DEFAULT NULL,
  `philHealth` int(50) DEFAULT NULL,
  `dswdPensioner` varchar(250) DEFAULT NULL,
  `livingArr` varchar(250) DEFAULT NULL,
  `psource` varchar(250) DEFAULT NULL,
  `psource_desc` varchar(250) DEFAULT NULL,
  `contrNum` int(50) DEFAULT NULL,
  `regSupport` varchar(250) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `img` varchar(250) DEFAULT NULL,
  `type` enum('scChapter','dswd') NOT NULL,
  `archived` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `scinfo`
--

INSERT INTO `scinfo` (`oscaID`, `lastName`, `firstName`, `middleName`, `suffix`, `gender`, `birthday`, `age`, `placeOfBirth`, `civilStat`, `contactNum`, `address`, `religion`, `citizenship`, `educAttain`, `tin`, `philHealth`, `dswdPensioner`, `livingArr`, `psource`, `psource_desc`, `contrNum`, `regSupport`, `date_created`, `img`, `type`, `archived`) VALUES
(12115, 'Cruz', 'Adrian Rusell', 'Sasutana', '-', 'Male', '1952-02-28', 73, 'Pasig City', 'Widowed', 931235231, '11 Kalayaan St. Gahit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6098, NULL, '2025-07-04 08:04:58', '/profile/Cruz, Adrian Rusell.png', 'scChapter', 0),
(28867, 'Enseñado', 'Glenmore', 'Serrano', 'Jr', 'Male', '2004-08-27', 20, 'Pasig City', 'Single', 931235231, '11 Kalayaan St. Gahit', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6094, NULL, '2024-12-03 10:30:56', NULL, 'scChapter', 0),
(28893, 'Cruz', 'Ahron Vince', 'Sasutana', '-', 'Male', '2010-11-28', 14, 'Pasig City', 'Single', 931235231, '481 N. Cruz St', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6095, NULL, '2024-12-03 10:04:57', '/profile/NOGNOG.jpg', 'scChapter', 0),
(28895, 'Sasutana', 'Amihan', 'Cruz', '', 'Male', '2003-02-28', 21, 'Pasig', 'Single', 2147483647, '481 N. CRUZ ST. VILLA RAYMUNDO', 'Roman Catholic', 'Filipino', 'college', 0, 0, 'others', 'highschool', 'Work', 'Fam', 0, 'yes', '2024-12-03 10:52:05', NULL, 'dswd', 0);

-- --------------------------------------------------------

--
-- Table structure for table `senioraffil`
--

CREATE TABLE `senioraffil` (
  `oscaID` int(11) NOT NULL,
  `affilNo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seniorreq`
--

CREATE TABLE `seniorreq` (
  `oscaID` int(11) NOT NULL,
  `reqID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`oscaID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `affilation`
--
ALTER TABLE `affilation`
  ADD PRIMARY KEY (`affilNo`);

--
-- Indexes for table `bin_dswd`
--
ALTER TABLE `bin_dswd`
  ADD KEY `oscaID` (`oscaID`),
  ADD KEY `seniorAffilNo` (`seniorAffilNo`);

--
-- Indexes for table `bin_scc`
--
ALTER TABLE `bin_scc`
  ADD KEY `oscaID` (`oscaID`),
  ADD KEY `reqID` (`reqID`),
  ADD KEY `receiptNo` (`receiptNo`);

--
-- Indexes for table `citizen`
--
ALTER TABLE `citizen`
  ADD PRIMARY KEY (`oscaID`);

--
-- Indexes for table `famcom`
--
ALTER TABLE `famcom`
  ADD KEY `oscaID` (`oscaID`);

--
-- Indexes for table `indiaffil`
--
ALTER TABLE `indiaffil`
  ADD KEY `oscaID` (`oscaID`);

--
-- Indexes for table `listahanaffil`
--
ALTER TABLE `listahanaffil`
  ADD KEY `oscaID` (`oscaID`);

--
-- Indexes for table `officers`
--
ALTER TABLE `officers`
  ADD KEY `oscaID` (`oscaID`);

--
-- Indexes for table `otheraffil`
--
ALTER TABLE `otheraffil`
  ADD KEY `oscaID` (`oscaID`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`receiptNo`),
  ADD KEY `oscaID` (`oscaID`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`reqID`);

--
-- Indexes for table `scinfo`
--
ALTER TABLE `scinfo`
  ADD PRIMARY KEY (`oscaID`);

--
-- Indexes for table `senioraffil`
--
ALTER TABLE `senioraffil`
  ADD KEY `oscaID` (`oscaID`),
  ADD KEY `affilNo` (`affilNo`);

--
-- Indexes for table `seniorreq`
--
ALTER TABLE `seniorreq`
  ADD KEY `oscaID` (`oscaID`),
  ADD KEY `reqID` (`reqID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `oscaID` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `citizen`
--
ALTER TABLE `citizen`
  MODIFY `oscaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `receiptNo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scinfo`
--
ALTER TABLE `scinfo`
  MODIFY `oscaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bin_dswd`
--
ALTER TABLE `bin_dswd`
  ADD CONSTRAINT `bin_dswd_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`),
  ADD CONSTRAINT `bin_dswd_ibfk_2` FOREIGN KEY (`seniorAffilNo`) REFERENCES `senioraffil` (`affilNo`);

--
-- Constraints for table `bin_scc`
--
ALTER TABLE `bin_scc`
  ADD CONSTRAINT `bin_scc_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`),
  ADD CONSTRAINT `bin_scc_ibfk_2` FOREIGN KEY (`reqID`) REFERENCES `requirements` (`reqID`),
  ADD CONSTRAINT `bin_scc_ibfk_3` FOREIGN KEY (`receiptNo`) REFERENCES `payments` (`receiptNo`);

--
-- Constraints for table `famcom`
--
ALTER TABLE `famcom`
  ADD CONSTRAINT `famcom_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`);

--
-- Constraints for table `indiaffil`
--
ALTER TABLE `indiaffil`
  ADD CONSTRAINT `indiaffil_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`);

--
-- Constraints for table `listahanaffil`
--
ALTER TABLE `listahanaffil`
  ADD CONSTRAINT `listahanaffil_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`);

--
-- Constraints for table `officers`
--
ALTER TABLE `officers`
  ADD CONSTRAINT `officers_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`);

--
-- Constraints for table `otheraffil`
--
ALTER TABLE `otheraffil`
  ADD CONSTRAINT `otheraffil_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`);

--
-- Constraints for table `senioraffil`
--
ALTER TABLE `senioraffil`
  ADD CONSTRAINT `senioraffil_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`),
  ADD CONSTRAINT `senioraffil_ibfk_2` FOREIGN KEY (`affilNo`) REFERENCES `affilation` (`affilNo`);

--
-- Constraints for table `seniorreq`
--
ALTER TABLE `seniorreq`
  ADD CONSTRAINT `seniorreq_ibfk_1` FOREIGN KEY (`oscaID`) REFERENCES `scinfo` (`oscaID`),
  ADD CONSTRAINT `seniorreq_ibfk_2` FOREIGN KEY (`reqID`) REFERENCES `requirements` (`reqID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
