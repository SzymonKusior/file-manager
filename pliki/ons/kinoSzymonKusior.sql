-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2025 at 01:17 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kino`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `cinema`
--

CREATE TABLE `cinema` (
  `ID` int(11) NOT NULL,
  `halls` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `halls`
--

CREATE TABLE `halls` (
  `ID` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `Seats` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `halls`
--

INSERT INTO `halls` (`ID`, `number`, `Seats`) VALUES
(1, 1, 300),
(2, 2, 300),
(3, 3, 300);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `movies`
--

CREATE TABLE `movies` (
  `ID` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` text NOT NULL,
  `Genre` varchar(50) NOT NULL,
  `Language` varchar(50) NOT NULL,
  `Director` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`ID`, `Title`, `Description`, `Genre`, `Language`, `Director`) VALUES
(1, 'Nosferatu', 'NOSFERATU Roberta Eggersa to gotycka opowieść o obsesji nawiedzonej, młodej kobiety a przerażającym, zauroczonym nią wampirem. Zuchwałe kino Roberta Eggersa jest zawsze prezentem dla fanów.', 'Horror', 'EN', 'Robert Eggers'),
(2, 'Interstellar', 'Historia grupy badaczy, którzy dzieki nowo odkrytemu tunelowi czasoprzestrzennemu pokonuja granice do tej pory przekraczajace ludzkie mozliwosci podrózowania w innym wymiarze. Film oparty jest na teorii naukowej opracowanej przez fizyka z Caltech Kipa Thorne\'a.', 'Sci-Fi', 'PL', 'Christopher Nolan'),
(3, 'Małpa', 'Bliźniacy Hal i Bill odkrywają na strychu zabawkową małpkę swojego ojca. Wkrótce po tym, w ich najbliższym otoczeniu zaczyna dochodzić do serii zagadkowych i makabrycznych zgonów. Próbując odciąć się od ewidentnie nawiedzonego przedmiotu, bracia postanawiają wyrzucić małpę i kontynuować swoje życie, jakby nic się nie stało. Jednak po latach kolejne niewytłumaczalne śmierci wychodzą na światło dzienne. Czas nie jest sprzymierzeńcem, a zło czyha na każdym kroku.', 'Horror', 'PL', 'Osgood Perkins'),
(4, '100 dni do matury', 'Kapsel to imprezowicz z klasy maturalnej, dla którego znacznie ważniejsza niż egzamin dojrzałości jest paczka bliskich znajomych. Gdy dociera do niego, że zakończenie liceum oznacza również rozpad jego ekipy, postanawia pokrzyżować wszystkim studenckie plany i podarować jeszcze jeden rok wspólnej beztroski. Aby ocalić przyjaciół od trudów wkraczania w dorosłość, zamierza włamać się do innowacyjnego systemu Ministerstwa Edukacji i zmienić wyniki matur. Do brawurowej akcji angażuje grupę licealistów z najmniejszymi szansami na zdanie matury oraz… dawno niewidzianego, pełnego kontrowersyjnych życiowych mądrości dziadka. Czy genialny plan Kapsla się powiedzie? Czy chłopakowi uda się zmienić bieg wydarzeń i zatrzymać przyjaciół przy sobie?', 'Komedia', 'PL', 'Mikołaj Piszczan');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `showtime_id` int(11) NOT NULL,
  `seat` varchar(20) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `showtime_id`, `seat`, `date`) VALUES
(1, 2, 1, '1x2', '2025-03-14 21:09:58'),
(2, 2, 1, '1x3', '2025-03-14 21:09:58'),
(3, 2, 1, '1x2', '2025-03-14 21:16:33'),
(4, 2, 1, '1x3', '2025-03-14 21:16:33'),
(5, 1, 1, '8x13', '2025-03-14 22:12:30'),
(6, 1, 1, '15x19', '2025-03-14 22:12:30'),
(7, 4, 1, '1x1', '2025-03-14 22:15:38'),
(8, 4, 1, '1x20', '2025-03-14 22:15:38'),
(9, 4, 1, '7x13', '2025-03-14 22:15:38'),
(10, 4, 1, '8x12', '2025-03-14 22:15:38'),
(11, 4, 1, '15x1', '2025-03-14 22:15:38'),
(12, 4, 1, '15x20', '2025-03-14 22:15:38'),
(13, 4, 1, '5x7', '2025-03-14 22:15:41'),
(14, 4, 1, '6x5', '2025-03-14 22:15:42'),
(15, 2, 1, '2x1', '2025-03-15 20:22:22'),
(16, 2, 1, '2x1', '2025-03-15 20:22:42'),
(17, 2, 1, '2x1', '2025-03-15 20:22:43'),
(18, 2, 1, '2x1', '2025-03-15 20:22:45'),
(19, 2, 1, '2x1', '2025-03-15 20:22:46'),
(20, 2, 1, '2x1', '2025-03-15 20:23:14'),
(21, 2, 1, '2x1', '2025-03-15 20:23:15'),
(22, 2, 1, '2x1', '2025-03-15 20:23:16'),
(23, 2, 1, '2x1', '2025-03-15 20:23:55'),
(24, 2, 1, '2x1', '2025-03-15 20:23:56'),
(25, 2, 1, '2x1', '2025-03-15 20:25:06'),
(26, 2, 1, '2x1', '2025-03-15 20:25:13'),
(27, 2, 1, '2x1', '2025-03-15 20:27:21'),
(28, 2, 1, '2x1', '2025-03-15 20:27:42'),
(29, 2, 1, '2x1', '2025-03-15 20:27:44'),
(30, 2, 1, '2x1', '2025-03-15 20:27:52'),
(31, 2, 1, '2x1', '2025-03-15 20:27:59'),
(32, 2, 1, '2x1', '2025-03-15 20:28:00'),
(33, 2, 1, '2x1', '2025-03-15 20:28:18'),
(34, 2, 1, '2x1', '2025-03-15 20:28:19'),
(35, 2, 1, '2x1', '2025-03-15 20:28:30'),
(36, 2, 1, '2x1', '2025-03-15 20:28:31'),
(37, 2, 1, '2x1', '2025-03-15 20:28:31'),
(38, 2, 1, '2x1', '2025-03-15 20:28:37'),
(39, 2, 1, '2x1', '2025-03-15 20:28:38'),
(40, 2, 1, '2x1', '2025-03-15 20:28:54'),
(41, 2, 1, '2x1', '2025-03-15 20:29:11'),
(42, 2, 1, '2x1', '2025-03-15 20:29:12'),
(43, 2, 1, '2x1', '2025-03-15 20:29:41'),
(44, 2, 1, '2x1', '2025-03-15 20:30:05'),
(45, 2, 1, '2x1', '2025-03-15 20:30:14'),
(46, 2, 1, '2x1', '2025-03-15 20:30:27'),
(47, 2, 1, '2x1', '2025-03-15 20:30:34'),
(48, 2, 1, '2x1', '2025-03-15 20:30:40'),
(49, 2, 1, '2x1', '2025-03-15 20:30:47'),
(50, 2, 2, '2x5', '2025-03-15 20:45:04'),
(51, 1, 2, '7x5', '2025-03-16 23:02:19'),
(52, 2, 1, '6x10', '2025-03-17 00:03:13'),
(53, 2, 1, '6x11', '2025-03-17 00:03:13'),
(54, 2, 1, '6x13', '2025-03-17 00:03:13'),
(55, 2, 1, '15x14', '2025-03-17 00:03:13'),
(56, 2, 1, '15x15', '2025-03-17 00:03:13'),
(57, 2, 8, '6x9', '2025-03-17 00:14:04'),
(58, 13, 7, '1x1', '2025-03-17 00:15:02'),
(59, 13, 7, '1x2', '2025-03-17 00:15:02'),
(60, 13, 7, '1x20', '2025-03-17 00:15:02'),
(61, 13, 7, '15x1', '2025-03-17 00:15:02'),
(62, 13, 7, '15x20', '2025-03-17 00:15:02');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `hall_id` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`id`, `movie_id`, `hall_id`, `time`) VALUES
(1, 1, 1, '2025-03-20 10:00:00'),
(2, 1, 1, '2025-03-20 13:00:00'),
(3, 1, 3, '2025-03-21 10:00:00'),
(4, 2, 2, '2025-03-20 10:30:00'),
(5, 2, 1, '2025-03-21 13:00:00'),
(6, 2, 1, '2025-03-22 15:00:00'),
(7, 4, 1, '2025-03-22 18:00:00'),
(8, 4, 1, '2025-03-17 00:53:44'),
(9, 3, 1, '2025-03-24 11:00:00'),
(10, 3, 1, '2025-03-24 15:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `phone_number`) VALUES
(1, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '0'),
(2, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '0'),
(3, 'test2', '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752', '0'),
(4, 'ok', '2689367b205c16ce32ed4200942b8b8b1e262dfc70d9bc9fbc77c49699a4f1df', '123'),
(5, 'pl', '3485639faf1591f3c16f295198e9389db5b33c949587ec48663597d4e00299d5', '123'),
(6, 'nk', 'cf50252908e527ebc5cacf537c3a4495a0c0ce5e1f0ec383b18290642cc8afaa', '123123123'),
(11, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '123123123'),
(12, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', '123123123'),
(13, 'asd', '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6', '1230986788');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `showtime_id` (`showtime_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hall_id` (`hall_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login` (`login`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cinema`
--
ALTER TABLE `cinema`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `halls`
--
ALTER TABLE `halls`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`hall_id`) REFERENCES `halls` (`ID`),
  ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
