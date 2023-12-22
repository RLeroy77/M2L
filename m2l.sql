-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : ven. 22 déc. 2023 à 09:52
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `m2l`
--

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id` char(36) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `description` text,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_mise_a_jour` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `nom`, `prix`, `quantite`, `description`, `date_creation`, `date_mise_a_jour`) VALUES
('bca5f763-7123-444c-8afc-0466d3271187', 'Produit 5', '5.00', 7, 'C\'est le produit 5', '2023-12-19 12:22:38', '2023-12-20 15:58:48'),
('8a3d1855-8ce5-4350-9b14-8ba6bd372fe0', 'Produit 4', '4.00', 16, 'C\'est le produit 4', '2023-12-19 12:22:09', '2023-12-20 16:10:28'),
('0de720ed-7a1f-46a1-89f2-da756aa32da6', 'Produit 2', '2.00', 20, 'C\'est le produit 2', '2023-12-19 10:38:43', '2023-12-19 13:20:50'),
('7dcd333f-8908-4f71-8c58-dc21c07412a0', 'Produit 3', '3.00', 30, 'C\'est le produit 3', '2023-12-19 12:21:29', '2023-12-19 13:21:29'),
('8efa72d9-38cd-4455-90b4-d3989d30ce12', 'Produit 1', '1.00', 10, 'C\'est le produit 1', '2023-12-06 14:31:15', '2023-12-07 11:35:44');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` char(36) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_mise_a_jour` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_name` (`user_name`(100))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `user_name`, `date_creation`, `date_mise_a_jour`, `mot_de_passe`, `admin`) VALUES
('1b98b72d-84d6-11ee-b4ea-74563c60cbe5', 'Leroy', 'Rémy', 'RLeroy', '2023-11-16 23:16:01', '2023-12-07 14:18:39', '$2y$10$LsuYiA7zGuaGd8VJhuvDju69yaVXy0N/r8wL99idl.xTC8gToU2kW', 1),
('46833c5a-84d9-11ee-b4ea-74563c60cbe5', 'Leroy', 'Rémy', 'RDieFox', '2023-11-16 23:38:42', '2023-12-07 11:47:17', '$2y$10$x0/U24Fd23dm7fdtbgzGBerEdBuHTyl574Psh.TXICvXKWDmoomRK', 1),
('dba007f3-82fc-47b7-9766-465a88b6dd93', 'n test', 'p test', 'u test', '2023-11-20 12:05:50', '2023-12-07 10:22:19', '$2b$10$e66K.e0jiMVjhk1Kchy0bOBMINOcuQEQgkHNQOmieQi1v3lJ7dMDq', 1),
('495a6096-f390-4df5-97fe-8457984c0842', 'Test 1', 'Test', '1', '2023-12-07 10:50:04', '2023-12-07 11:50:04', '$2b$10$NXlx36C4lS8mj.tPKCWnue.vAdomQgSuccHGs3rUnhib6Frzej0cC', 0),
('807cedec-31ac-445e-be61-2af1242174c4', 'Test 2', 'Test', '2', '2023-12-07 10:50:15', '2023-12-07 11:50:15', '$2b$10$PcLdiXWZPFOcGQB04chr.u3IN7NGpptCz0MLnERIvpFkgestWxoXy', 0),
('cf79595f-4113-4b9c-9f90-5f568d878643', 'Test 3', 'Test', '3', '2023-12-07 10:50:29', '2023-12-07 11:50:29', '$2b$10$PFwZejUgHZfVr8DKl7mrBerlVFV9nEM6M94SdJ/Ex.9FJn2qSI4nm', 0),
('06746613-4f97-47f7-9be8-c8edf1e816ab', 'Test 4', 'Test', '4', '2023-12-07 10:50:45', '2023-12-07 11:50:45', '$2b$10$QynW6XtqaV/fiI8lcf8lSee0s63VbS.sn.O6Q/WRvATr/UgLUW0QO', 0),
('811e50c8-bce8-4269-a739-f931204e3d8a', 'Test 5', 'Test', '5', '2023-12-07 10:50:58', '2023-12-07 11:50:58', '$2b$10$7KWCS14LiMgBgoQsM1iZt.bMc6Igz5A5RbViXQKCqMHEdmfypJ2L6', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
