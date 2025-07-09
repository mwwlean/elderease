-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2025 at 08:40 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `affilation`
--

CREATE TABLE `affilation` (
  `affilNo` int(11) NOT NULL,
  `affilDesc` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(123, 'test', 'tes', 'test', 'test', 'Male', '2005-12-16', 19, 'test', 'Single', 2147483647, 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 123, NULL, '2025-07-09 00:38:07', '/profile/people-face-avatar-icon-cartoon-character-png.png', 'scChapter', 0);

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
  MODIFY `oscaID` int(250) NOT NULL AUTO_INCREMENT;

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
