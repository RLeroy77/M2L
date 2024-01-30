-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : mar. 30 jan. 2024 à 10:03
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
('efba3820-a23d-40f2-8059-f5a799d2cbde', 'Produit 7', '7.00', 70, 'C\'est le produit 7', '2024-01-02 10:56:18', '2024-01-02 11:56:19'),
('75a63711-4797-471f-b558-5c9e0de9c122', 'Produit 6', '6.00', 59, 'C\'est le produit 6', '2024-01-02 10:55:28', '2024-01-17 11:32:06'),
('bca5f763-7123-444c-8afc-0466d3271187', 'Produit 5', '5.00', 33, 'C\'est le produit 5', '2023-12-19 12:22:38', '2024-01-02 11:37:31'),
('8a3d1855-8ce5-4350-9b14-8ba6bd372fe0', 'Produit 4', '4.00', 39, 'C\'est le produit 4', '2023-12-19 12:22:09', '2023-12-27 13:34:22'),
('0de720ed-7a1f-46a1-89f2-da756aa32da6', 'Produit 2', '2.00', 20, 'C\'est le produit 2', '2023-12-19 10:38:43', '2023-12-26 23:45:53'),
('7dcd333f-8908-4f71-8c58-dc21c07412a0', 'Produit 3', '3.00', 30, 'C\'est le produit 3', '2023-12-19 12:21:29', '2023-12-26 23:45:59'),
('8efa72d9-38cd-4455-90b4-d3989d30ce12', 'Produit 1', '1.00', 10, 'C\'est le produit 1', '2023-12-06 14:31:15', '2023-12-26 23:46:06');

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
('ada9eaac-eefe-48e7-952f-b185a3320b6e', 'LEROY', 'Rémy', 'RDieFox', '2024-01-17 10:25:41', '2024-01-17 11:25:41', '$2b$10$Am/3OOLo0JmbJgC84yAcjurcZwpgvaLTh5YUQmJAI.aF72X5QsPBm', 0),
('dba007f3-82fc-47b7-9766-465a88b6dd93', 'n test', 'p test', 'u test', '2023-11-20 12:05:50', '2024-01-17 13:38:10', '$2b$10$e66K.e0jiMVjhk1Kchy0bOBMINOcuQEQgkHNQOmieQi1v3lJ7dMDq', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
