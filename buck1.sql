-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 03, 2017 at 06:09 PM
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
  `Pid` int(11) NOT NULL,
  `Pname` varchar(200) NOT NULL,
  `ITCid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `added_product`
--

INSERT INTO `added_product` (`Pid`, `Pname`, `ITCid`) VALUES
(10, 'Dettol Soap', 5),
(11, 'Peach Milk', 2),
(13, 'Surf Excel', 2),
(14, 'Burn Vita', 1),
(15, 'Kissan Jam', 1),
(16, 'Tropicana Juice', 1),
(18, 'Red Label', 1),
(19, 'Tazza', 1),
(20, 'Parle-G', 1),
(21, 'Vim bar', 1),
(22, 'Dettol Hand Wash', 5);

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
(2, 'Cosmetics'),
(4, 'Footwear'),
(3, 'Garments'),
(1, 'Kitchen'),
(5, 'Shower Room');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Pid` int(11) NOT NULL,
  `Userid` int(11) NOT NULL,
  `UnitPrice` double NOT NULL,
  `Discount` double NOT NULL,
  `Quantity` double NOT NULL,
  `Date_Time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Pid`, `Userid`, `UnitPrice`, `Discount`, `Quantity`, `Date_Time`) VALUES
(0, 1, 10, 5, 25, '0000-00-00 00:00:00'),
(10, 2, 50, 25, 1000, '0000-00-00 00:00:00'),
(11, 1, 150, 10, 10, '0000-00-00 00:00:00'),
(13, 1, 75, 8, 5, '0000-00-00 00:00:00'),
(14, 1, 140, 3, 6, '0000-00-00 00:00:00'),
(15, 1, 90, 4, 8, '0000-00-00 00:00:00'),
(16, 1, 60, 2, 8, '0000-00-00 00:00:00'),
(18, 0, 25, 5, 65, '0000-00-00 00:00:00'),
(21, 20, 20, 2, 25, '0000-00-00 00:00:00'),
(22, 20, 70, 32, 25, '0000-00-00 00:00:00');

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
  `Latitude` double DEFAULT NULL,
  `Longitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Userid`, `Fname`, `Lname`, `Email`, `PhoneNo`, `Password`, `Address`, `Selectid`, `Latitude`, `Longitude`) VALUES
(1, 'Vishesh', 'Mittal', 'visheshmittal97@gmail.com', 7418593, '789', 'ghjkl', 2, 30.521652, 76.663295),
(13, 'Baibhav', 'aggarwal', 'baibhav@outlook', 1234567, '$2a$10$hUWQeaHO48M1hiKqx9KDe.rLqtnQgUxs3FqEB2N7niZ', 'xdfcgh', 2, 30.518668, 76.658851),
(19, 'Bai', 'hds', 'dh@h', 37437, 'hdf', 'hjfvbqhjebv', 1, 0, 0),
(20, 'Baibhav', 'Agarwal', 'countersba@gmail.com', 8894412, '$2a$10$vMCqBj.AYw1hRRVseHjC3uMXdKClqNDqgagQ6Wx3Xbgs30FEptJyi', 'ddc', 2, 30.523482, 76.667672),
(23, 'sd', 'hdb', 'hfvb@jhd', 32823, 'as', 'isc', 1, 30.509540100000002, 76.6585865),
(25, 'sd', 'cd', 'fg@dk', 2322332, 'aaaa', 'c', 1, 30.7334026, 76.7796079),
(27, 'wq', 'e', 'e@ed', 2322232372, '1', 'hcs', 1, 0, 0),
(28, 'karan', 'Arora', 'arora15karan1996@gmail.com', 3489629382, 'qwerty', 'jfdjn,fok', 1, 0, 0),
(29, 'Saurabh', 'Thakur', 'thakur295@gmail.com', 23582735, 'qwerty', 'hdcb', 1, 30.520534400000003, 76.6585865),
(30, 'iehdc', 'jh', 'dh@kjf', 26385487, '$2a$10$vMCqBj.AYw1hRRVseHjC3uMXdKClqNDqgagQ6Wx3Xbgs30FEptJyi', 'uyd', 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `added_product`
--
ALTER TABLE `added_product`
  ADD PRIMARY KEY (`Pid`);

--
-- Indexes for table `itemcategory`
--
ALTER TABLE `itemcategory`
  ADD UNIQUE KEY `ITCid` (`ITCid`),
  ADD UNIQUE KEY `ITCname` (`ITCname`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD UNIQUE KEY `Pid` (`Pid`);

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
  MODIFY `Pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
