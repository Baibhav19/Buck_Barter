-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2017 at 07:30 PM
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
(33, 'Maggie', 1),
(34, 'Nike Shoe', 4),
(35, 'Lux Soap', 5),
(36, 'Mufti Jean', 3),
(37, 'Socks', 3),
(38, 'Bajaj Almond', 5),
(39, 'Sugar', 1),
(43, 'Ponds', 2),
(47, 'Magi', 1),
(49, 'Maggi', 1),
(54, 'milk', 2),
(55, 'decoration', 1),
(57, 'gjhkjk', 3),
(58, 'kf', 1),
(59, 'Kajal', 2),
(60, 'Pepsi', 1),
(61, 'Dove Shampoo', 5),
(62, 'Face Wash', 5);

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
  `Date_Time` datetime NOT NULL,
  `filename` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`pid`, `Userid`, `UnitPrice`, `Discount`, `Quantity`, `Description`, `Date_Time`, `filename`) VALUES
(33, 46, 23, 2, 17, 'double pack', '2017-03-30 11:36:34', '46-baibhavimg.jpg'),
(59, 47, 150, 5, 11, '50mg Loreal Non smudge', '2017-04-08 01:21:41', '47-5456.jpg'),
(60, 43, 85, 7, 8, '2 L soft drink', '2017-04-05 08:12:36', '43-45.jpg'),
(31, 43, 25, 5, 5, '100 gm Toilet Soap', '2017-03-31 10:58:53', '43-Dettol.jpg'),
(32, 43, 250, 10, 6, '1 kg Complan Original', '2017-04-06 12:49:39', '43-43-images.jpg'),
(32, 43, 275, 10, 2, '1 kg Complan Kesar Badam', '2017-04-02 12:22:23', '43-43-compla.jpg'),
(61, 43, 150, 10, 7, 'Anti Dandruff with lemon extracts', '2017-04-08 06:05:28', '43-Dove-Dryness-Care-Shampoo.jpg'),
(62, 43, 80, 10, 10, '100ml Ponds Men Energy Charge', '2017-04-08 06:22:18', '43-images.jpg');

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
  `Longitude` double DEFAULT NULL,
  `filename` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Userid`, `Fname`, `Lname`, `Store_Name`, `Email`, `PhoneNo`, `Password`, `Address`, `Selectid`, `Home_Delivery`, `Latitude`, `Longitude`, `filename`) VALUES
(43, 'Baibhav', 'Aggarwal', 'Reliance', 'baibhav@outlook.com', 9876543210, '$2a$10$nKEroKsNlOuCbb8Q6nhrMO655bJvDHhQ9MuyJQPcrZSx3PxJAJs0C', 'Room no 308 Chitkara University', 2, 'Availabe', 30.514370399999997, 76.6620078, ''),
(45, 'Shivam', 'Garg', 'Anapurna', '05shivamgarg@gmail.com', 9056505227, '$2a$10$rUIruiSNSykX6J7SYmGvLehxQ0uOFDiovALuumf8ZzBPRTxQHPjaW', 'Chitkara University, Jhasla', 2, 'Availabe', 30.514341899999998, 76.66196579999999, ''),
(46, 'fcvbn', 'cfvbn', 'uhgvc', 'garg123@gmail.com', 5625432956, '$2a$10$EuUzs.peAQ04o15HeHo8.eTLGhN.mOlGj7l01wOj1dTnxku31ukIa', 'Chitkara University, Jhasla', 2, 'Availabe', 30.514338000000002, 76.6619652, ''),
(47, 'Esha', 'Wadhwa', 'Esha Cosmetics', 'esha.ew@gmail.com', 9882257372, '$2a$10$j2/KyUwkAfJEhpknKFHipuBzX4tWlpRWkexix35WWdNqCwQtWQYHi', 'Chitkara University', 2, 'Availabe', 30.522620003, 76.6585865, ''),
(48, 'Karan', 'Arora', 'Arora general store', 'arora15@gmail.com', 8863410343, '$2a$10$WxfgDdAE99qDmVMGqfgH9.FzkhgBynCxBZqMayKFLzrKnKKqKVaoO', 'Turing BLock,Chitkara University', 2, 'Availabe', 30.520733, 76.6585865, ''),
(49, 'Gaurav', 'Yadav', '', 'gaurav217@gmail.com', 9883344555, '$2a$10$d33ens22Ix9rbMWsA.jqOe8wt69ktqIkRtYhw1Og89QxTyCgkrAWC', 'Vosco hostel chitkara University', 1, '', 30.514324899999995, 76.66196029999999, ''),
(50, 'Saurabh', 'Thakur', '', 'saurabh207@gmail.com', 9882255272, '$2a$10$ebknY4gneXGfweyi7Pf8PuoWtnVIlFoDin054vVXjDCU/qUwE/Foa', 'sector 31-D Hno.132', 1, '', 30.514257699999995, 76.6620573, '');

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
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
