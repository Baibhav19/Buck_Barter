-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2017 at 02:10 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buck2`
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
(1, 'Maggi', 1),
(2, 'Kajal', 2),
(3, 'Moisturizer', 2),
(4, 'Eyeliner', 2),
(5, 'Lipstick', 2),
(6, 'Dettol Soap', 5),
(7, 'Dove Shampoo', 5),
(8, 'Complan', 1),
(9, 'Odonil', 5),
(10, 'Ponds Face Wash', 5),
(11, 'Kinley Water Bottle', 1),
(12, 'Vim Bar', 1),
(13, 'Puma Shoes', 4),
(14, 'Butter Bite Buiscuits', 1),
(15, 'Dettol Handwash', 5),
(16, 'Tshirt', 3),
(17, 'Pepsi', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `pid` int(11) NOT NULL,
  `Userid` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Date_Time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`pid`, `Userid`, `Quantity`, `Description`, `Date_Time`) VALUES
(10, 3, 1, 'Ponds Enery Booster FaceWash 120gms', '2017-04-14 05:26:43'),
(11, 3, 1, 'Kinley Water Bottle 500ml', '2017-04-14 05:26:46'),
(14, 3, 1, 'Butter Bite Buiscuits with extra nuts 150gms', '2017-04-14 05:26:50'),
(12, 2, 1, 'Vim Bar with Lemon Extracts 100 gm', '2017-04-14 05:28:05'),
(14, 2, 1, 'Butter Bite Buiscuits with extra nuts 150gms', '2017-04-14 05:28:08'),
(10, 2, 1, 'Ponds Enery Booster FaceWash 120gms', '2017-04-14 05:33:00'),
(16, 3, 1, 'HIMYM Fan Tshirt size L', '2017-04-14 05:34:12');

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
(1, 4, 24, 5, 10, 'Double pack', '2017-04-13 10:40:37', '4-46-baibhavimg.jpg'),
(2, 7, 75, 6, 20, 'Loreal Colossal Magique Kajal 30gms', '2017-04-13 11:31:12', '7-47-5456.jpg'),
(3, 7, 170, 10, 10, 'Lakme Moisturizer Peach Milk', '2017-04-13 11:38:14', '7-417TcM2d7SL._SL1000_.jpg'),
(4, 7, 70, 5, 30, 'Loreal SuperLiner BlockBuster 25 ml', '2017-04-13 11:39:57', '7-10153515.jpg'),
(5, 7, 30, 10, 55, 'Lakme Enrick Mate Lipstick Red Colour', '2017-04-13 11:43:15', '7-51gUzvOE-NL._SL1000_.jpg'),
(6, 4, 12, 0, 20, 'Dettol Original Variant 30gms', '2017-04-13 11:44:19', '4-43-Dettol.jpg'),
(7, 4, 150, 5, 20, 'Dove Enrich Hair Fall Treatment 200ml', '2017-04-13 11:45:12', '4-43-Dove-Dryness-Care-Shampoo.jpg'),
(8, 4, 185, 6, 50, 'Complan Kesar Pista 250gms', '2017-04-13 11:45:55', '4-43-43-compla.jpg'),
(9, 4, 35, 0, 30, 'Odonil Lavender variant 100gms', '2017-04-13 11:47:59', '4-Odonil-Lavender-Meadows-50-gm.jpg'),
(10, 1, 60, 5, 19, 'Ponds Enery Booster FaceWash 120gms', '2017-04-13 11:57:22', '1-43-images.jpg'),
(11, 1, 20, 0, 20, 'Kinley Water Bottle 500ml', '2017-04-13 11:58:08', '1-kinleywaterbottel.png'),
(12, 1, 32, 5, 50, 'Vim Bar with Lemon Extracts 100 gm', '2017-04-13 11:59:21', '1-VIM-BAR.jpg'),
(13, 1, 1000, 10, 20, 'Puma Casual Shoes size 8', '2017-04-14 12:05:11', '1-index.jpg'),
(14, 1, 30, 10, 10, 'Butter Bite Buiscuits with extra nuts 150gms', '2017-04-14 12:07:16', '1-indexbutter.jpg'),
(15, 3, 55, 10, 20, 'Dettol Handwash Skincare 210ml', '2017-04-14 12:10:55', '3-indexhand.jpg'),
(16, 3, 250, 10, 10, 'Game of thrones Fan Tshirt size M', '2017-04-14 12:12:22', '3-images.jpg'),
(16, 3, 250, 10, 10, 'HIMYM Fan Tshirt size L', '2017-04-14 12:14:54', '3-himym.jpg'),
(17, 3, 85, 5, 7, '2Lsoft drink', '2017-04-14 12:45:14', '3-43-45.jpg');

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
(1, 'Vishesh', 'Mittal', 'Mittal Mega Stores', 'visheshmittal97@gmail.com', 9736999719, '$2a$10$6VnYW76HJmzQosM6KGrSKeWA1.SaFlo1Jdzv125RvCfuwdZV1QrOe', 'Room no 305 Chitkara University', 2, 'Availabe', 30.51438984499998, 76.6619949, 'visheshmittal97@gmail.com-MittalCityMall_Bathinda.jpg'),
(2, 'Saurabh', 'Thakur', '', 'saurabh.thakur295@gmail.com', 9882255736, '$2a$10$5REZtuGH8L3Ne2e0p50AIOf2zRgw3.eSiyFvQaf0SYr83vl1H6Lvq', 'Sec 31D', 1, '', 30.514389899999998, 76.6619949, ''),
(3, 'Baibhav', 'Aggarwal', 'Easy Day Stores', 'baibhav@outlook.com', 8894416412, '$2a$10$BsojfU4ANYMVZhfTXvV1DeG/AqXcbeCYpY66.2JYVnt5iY0e7J9aa', 'Room no 308 Chitkara University', 2, 'Availabe', 30.5149, 76.6698486, 'baibhav@outlook.com-easyday-dhuri.jpg'),
(4, 'Gaurav', 'Yadav', 'Bobby General Stores ', 'gaurav@gmail.com', 9883322552, '$2a$10$egkrbMWPDmrZ/LcWIKcxI.JE3OfCE9rRHyrlkknOGReFfr7TPkDYO', 'Vosco Boys Hostel Chitkara University', 2, 'Not Available', 30.5162556, 76.668888, 'gaurav@gmail.com-d.jpg'),
(7, 'Esha', 'Wadhwa', 'Esha Cosmetics', 'esha.ew@gmail.coom', 9882254854, '$2a$10$Jr8Xh/mKTUaeJfSLqGUE7.H.AO7y2iB1eHor0UiP0ziYWTkbV84B2', 'Teresa Hostel Chitkara University', 2, 'Availabe', 30.527612, 76.672297, 'esha.ew@gmail.coom-c2cfcf97d7d33929310848357c6eb650.jpg'),
(8, 'Karan', 'Arora', '', 'karan.arora@gmail.com', 9887766552, '$2a$10$p5qdfHzoB9dyClFu0qwSpO1dCj2nFJy/JE8EP6JziIMHoMZ1oIjbS', 'Sec. 38D', 1, '', 30.514296, 76.6619977, '');

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
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
