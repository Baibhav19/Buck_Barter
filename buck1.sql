-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2017 at 12:54 PM
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
  `ITCid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `added_product`
--

INSERT INTO `added_product` (`pid`, `Pname`, `ITCid`) VALUES
(31, 'Dettol Soap', 5),
(32, 'Complan', 1),
(33, 'Rice', 1);

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
  `Description` varchar(300) NOT NULL,
  `Date_Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pid`, `Userid`, `UnitPrice`, `Discount`, `Quantity`, `Description`, `Date_Time`) VALUES
(31, 43, 12, 2, 5, 'Original Dettol Soap 100 gms.', '2017-03-21 11:09:27'),
(32, 43, 120, 10, 5, 'Complan Kesan Pista 500 gms.', '2017-03-19 08:34:09'),
(32, 43, 200, 20, 5, 'Complan Vanila 500 gm', '2017-03-19 08:35:06'),
(32, 40, 150, 10, 10, 'Complan Original 200 gm', '2017-03-19 08:36:23'),
(33, 50, 50, 20, 20, '1kg - basmati Rice', '2017-03-22 10:13:49');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Userid` int(11) NOT NULL,
  `Fname` varchar(50) NOT NULL,
  `Lname` varchar(50) NOT NULL,
  `Store_Name` varchar(500) NOT NULL,
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

INSERT INTO `users` (`Userid`, `Fname`, `Lname`, `Store_Name`, `Email`, `PhoneNo`, `Password`, `Address`, `Selectid`, `Home_Delivery`, `Latitude`, `Longitude`) VALUES
(42, 'Parv', 'Mittal', '', 'parv@gmail.com', 8520, '$2a$10$k7N3FFba6.ukIMoccdRRGOjH9YPZpTXTkjx/oWZ/oQJ5kjh/jawUK', 'jnmk,l.', 1, '', 30.5143937, 76.661971),
(43, 'Baibhav', 'Aggarwal', 'Easy_Day', 'baibhav@outlook.com', 9876543210, '$2a$10$nKEroKsNlOuCbb8Q6nhrMO655bJvDHhQ9MuyJQPcrZSx3PxJAJs0C', 'Room no 308 Chitkara University', 2, 'Availabe', 30.514370399999997, 76.6620078),
(45, 'Shivam', 'Garg', 'Anapurna', '05shivamgarg@gmail.com', 9056505227, '$2a$10$rUIruiSNSykX6J7SYmGvLehxQ0uOFDiovALuumf8ZzBPRTxQHPjaW', 'Chitkara University, Jhasla', 2, 'Availabe', 30.514341899999998, 76.66196579999999),
(49, 'Gaurav', 'Yadav', 'Bobby General store', 'gaurav@outlook.com', 543285412, '$2a$10$OR6TqfXzDDgW0f4Mu7LH9.xTXKgIjrUfTDdYdUtESfeZOptvXYv0i', 'chitkara', 2, 'Availabe', 30.5212479, 76.6669556),
(50, 'Baby', 'Aggarwal', 'Baby Karyana de samana', 'countersba@gmail.com', 0, '$2a$10$Azs8iB5SkN8Bma0ClCjq5OsajheohTb6cenQ7BLDbF.ecA2HSMupi', 'Vasco De Gam Hostel', 2, 'Availabe', 30.516066600000002, 76.6597429);

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
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
