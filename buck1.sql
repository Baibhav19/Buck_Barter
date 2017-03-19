-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 19, 2017 at 11:31 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buck1`
--

-- --------------------------------------------------------

--
-- Table structure for table `added_product`
--

CREATE TABLE `added_product` (
  `pid` int(11) NOT NULL,
  `Pname` varchar(200) NOT NULL,
  `NetWeight` varchar(300) NOT NULL,
  `Description` varchar(300) NOT NULL,
  `ITCid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `added_product`
--

INSERT INTO `added_product` (`pid`, `Pname`, `NetWeight`, `Description`, `ITCid`) VALUES
(21, 'Dettol Soap', '100 gm', 'Original Dettol Soap 100 gm', 1),
(22, 'Dettol Soap', '100 gm', 'Menthol Dettol Soap 50gm', 1),
(23, 'Lakme Moisturizer', '250 gm', 'Lakme Moisturizer Peach Variant 250 gm', 2),
(24, 'Complan', '500 gm', 'Complan Kesar Pista 500gm', 1);

-- --------------------------------------------------------

--
-- Table structure for table `itemcategory`
--

CREATE TABLE `itemcategory` (
  `ITCid` int(11) NOT NULL,
  `ITCname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemcategory`
--

INSERT INTO `itemcategory` (`ITCid`, `ITCname`) VALUES
(1, 'Kitchen'),
(2, 'Cosmetics'),
(3, 'Garments'),
(4, 'Footwear'),
(5, 'Shower Room');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `pid` int(11) NOT NULL,
  `Userid` int(11) NOT NULL,
  `UnitPrice` double NOT NULL,
  `Discount` double NOT NULL,
  `Quantity` double NOT NULL,
  `Date_Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pid`, `Userid`, `UnitPrice`, `Discount`, `Quantity`, `Date_Time`) VALUES
(22, 40, 12, 3, 10, '2017-03-19 02:25:08'),
(23, 40, 135, 5, 10, '2017-03-19 02:27:09'),
(24, 40, 160, 0, 10, '2017-03-19 02:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Userid` int(11) NOT NULL,
  `Fname` varchar(50) NOT NULL,
  `Lname` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `PhoneNo` bigint(11) NOT NULL,
  `Password` varchar(200) NOT NULL,
  `Address` varchar(150) NOT NULL,
  `Selectid` int(11) NOT NULL,
  `Home_Delivery` varchar(300) NOT NULL,
  `Latitude` double DEFAULT NULL,
  `Longitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Userid`, `Fname`, `Lname`, `Email`, `PhoneNo`, `Password`, `Address`, `Selectid`, `Home_Delivery`, `Latitude`, `Longitude`) VALUES
(38, 'Shivam', 'Garg', '05shivamgarg@gmail.com', 785428451, '$2a$10$WliZUC.brs2Z7oyZ04OMAOW1jnc2mWXRsyKdZZ2tKnglrLEoDNdjq', 'Chitkara University', 1, '', 29.0587757, 76.085601),
(40, 'Vishesh', 'Mittal', 'visheshmittal97@gmail.com', 9736999719, '$2a$10$A2MZYIndyuMeBNJ7nF3DJOtLxnDsTwcqVDSj.PvE3gGokEtoesHLK', 'Avas Vikas BSR', 2, 'Available', 27.1766701, 78.00807449999999),
(42, 'Parv', 'Mittal', 'parv@gmail.com', 8520, '$2a$10$k7N3FFba6.ukIMoccdRRGOjH9YPZpTXTkjx/oWZ/oQJ5kjh/jawUK', 'jnmk,l.', 1, '', 30.5143937, 76.661971),
(43, 'Baibhav', 'Aggarwal', 'baibhav@outlook.com', 9876543210, '$2a$10$nKEroKsNlOuCbb8Q6nhrMO655bJvDHhQ9MuyJQPcrZSx3PxJAJs0C', 'Room no 308 Chitkara University', 2, 'Availabe', 30.514370399999997, 76.6620078);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `added_product`
--
ALTER TABLE `added_product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Userid`),
  ADD UNIQUE KEY `id` (`Userid`),
  ADD UNIQUE KEY `id_2` (`Userid`),
  ADD UNIQUE KEY `id_3` (`Userid`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `PhoneNo` (`PhoneNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `added_product`
--
ALTER TABLE `added_product`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
