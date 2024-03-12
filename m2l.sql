-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : mar. 12 mars 2024 à 15:55
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
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `id_utilisateur` char(36) NOT NULL,
  `id_produit` char(36) NOT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`,`id_produit`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_utilisateur`, `id_produit`, `quantite`) VALUES
('dba007f3-82fc-47b7-9766-465a88b6dd93', '7dcd333f-8908-4f71-8c58-dc21c07412a0', 3),
('dba007f3-82fc-47b7-9766-465a88b6dd93', '75a63711-4797-471f-b558-5c9e0de9c122', 11),
('dba007f3-82fc-47b7-9766-465a88b6dd93', 'efba3820-a23d-40f2-8059-f5a799d2cbde', 12);

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
('efba3820-a23d-40f2-8059-f5a799d2cbde', 'Produits 7', '7.77', 60, 'C la produit 7', '2024-01-02 10:56:18', '2024-03-12 15:54:40'),
('75a63711-4797-471f-b558-5c9e0de9c122', 'Produit 6', '6.00', 45, 'C\'est le produit 6', '2024-01-02 10:55:28', '2024-03-12 14:06:52'),
('0de720ed-7a1f-46a1-89f2-da756aa32da6', 'Produit 2', '2.00', 19, 'C\'est le produit 2', '2023-12-19 10:38:43', '2024-02-29 16:10:02'),
('7dcd333f-8908-4f71-8c58-dc21c07412a0', 'Produit 3', '3.00', 27, 'C\'est le produit 3', '2023-12-19 12:21:29', '2024-03-12 14:29:47'),
('90440974-5c6d-4e52-9eeb-583384d8ce1a', 'Produit 1', '1.00', 11, 'C le produit 1', '2024-03-12 08:10:23', '2024-03-12 09:10:23');

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
('ada9eaac-eefe-48e7-952f-b185a3320b6e', 'LEROY', 'Rémy', 'RDieFox', '2024-01-17 10:25:41', '2024-02-28 14:17:52', '$2b$10$Am/3OOLo0JmbJgC84yAcjurcZwpgvaLTh5YUQmJAI.aF72X5QsPBm', 0),
('dba007f3-82fc-47b7-9766-465a88b6dd93', 'n test', 'p test', 'u test', '2023-11-20 12:05:50', '2024-01-17 13:38:10', '$2b$10$e66K.e0jiMVjhk1Kchy0bOBMINOcuQEQgkHNQOmieQi1v3lJ7dMDq', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
