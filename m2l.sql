-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : mer. 06 déc. 2023 à 15:38
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
  `id` char(36) NOT NULL,
  `id_user` char(36) DEFAULT NULL,
  `id_produit` char(36) DEFAULT NULL,
  `prix_total` decimal(10,2) DEFAULT NULL,
  `valider` tinyint(1) DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_mise_a_jour` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
('8efa72d9-38cd-4455-90b4-d3989d30ce12', 'Produit 1', '1.00', 10, 'C\'est le produit 1', '2023-12-06 14:31:15', '2023-12-06 15:31:32');

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
('1b98b72d-84d6-11ee-b4ea-74563c60cbe5', 'Leroy', 'Rémy', 'RLeroy', '2023-11-16 23:16:01', '2023-11-16 23:53:52', '$2y$10$LsuYiA7zGuaGd8VJhuvDju69yaVXy0N/r8wL99idl.xTC8gToU2kW', 0),
('46833c5a-84d9-11ee-b4ea-74563c60cbe5', 'Leroy', 'Rémy', 'RDieFox', '2023-11-16 23:38:42', '2023-11-16 23:53:46', '$2y$10$x0/U24Fd23dm7fdtbgzGBerEdBuHTyl574Psh.TXICvXKWDmoomRK', 1),
('c678d7bb-eba2-4aa6-ae4b-0bcc56f8f88c', 'Nom Test', 'Prénom Test', 'User Test', '2023-11-19 16:50:10', '2023-11-19 17:50:10', '$2b$10$sgOHC7exQIBCzTZHEn5RwuRprKNGtOrYY9oCpv6tNFKSccbpYDy1e', 0),
('dba007f3-82fc-47b7-9766-465a88b6dd93', 'n test', 'p test', 'u test', '2023-11-20 12:05:50', '2023-11-22 15:53:47', '$2b$10$e66K.e0jiMVjhk1Kchy0bOBMINOcuQEQgkHNQOmieQi1v3lJ7dMDq', 1),
('c5ec1a29-92dc-4d1d-ab93-223cbc0aeb80', 'testn', 'testp', 'testu', '2023-11-22 14:38:03', '2023-11-22 15:38:03', '$2b$10$96NdrIe3l.9yn2hmgucVsO2NuW3Sez91r8DBL69/D9LFDP2zhBQ0C', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
