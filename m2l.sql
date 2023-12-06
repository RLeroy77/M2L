-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : mer. 06 déc. 2023 à 10:26
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
('4e632530-6689-45cd-9a78-5fa459322288', 'Produit 2', '22.00', 200, 'C\'est le produit 2', '2023-11-29 15:10:44', '2023-11-29 23:00:26'),
('4475640d-b299-4a6c-bff8-a638e0aa40ca', 'Produit 1', '11.00', 111, 'C le Produit 1', '2023-11-29 15:09:48', '2023-12-06 10:10:02'),
('587808da-55eb-4322-bee3-ce742de57bfb', 'Produit 4', '4.00', 40, 'C\'est le produit 4', '2023-11-29 19:54:57', '2023-11-29 23:01:28'),
('ac117647-0d16-4eba-80be-18b47089bbbb', 'Produit 3', '3.00', 3, 'C\'est le produit 3', '2023-11-29 19:54:01', '2023-11-29 23:01:38'),
('2bb929ac-fbc1-40dd-bdc0-2bdb446f7cb6', 'Produit 8', '8.00', 80, 'C\'est le produit 8', '2023-11-23 13:12:01', '2023-11-29 23:01:50'),
('2a5225a5-96df-4534-a47c-615b4620f37d', 'Produit 9', '9.00', 90, 'C\'est le produit 9', '2023-11-23 13:13:37', '2023-11-29 23:02:00'),
('6d9ec68d-c661-4c75-8f45-b5091d12bfa8', 'Produit 10', '10.00', 100, 'C\'est le produit 10', '2023-11-23 13:20:39', '2023-11-29 23:02:09'),
('8e4046a2-2bc1-43a6-9bb3-4e50d6167235', 'Produit 11', '11.00', 110, 'C\'est le produit 11', '2023-11-23 13:28:13', '2023-11-29 23:02:16'),
('2479c0c6-4f65-4afd-88f3-55195d87706f', 'Produit 5 ', '5.00', 50, 'C\'est le produit 5', '2023-11-29 22:07:33', '2023-11-29 23:07:33'),
('7257d41e-64d0-44dd-99da-83aa09fa953f', 'Produit 6', '6.00', 60, 'C\'est le produit 6', '2023-12-05 07:16:00', '2023-12-05 08:16:01'),
('bdec692d-f911-4610-a861-2c04f3f3a08c', 'Produit 12', '12.00', 120, 'C\'est le produit 12', '2023-12-06 09:25:48', '2023-12-06 10:25:48'),
('1a29c019-67a0-4a47-aaa3-90515549273d', 'Produit 7', '7.00', 70, 'C\'est le produit 7', '2023-12-06 09:23:23', '2023-12-06 10:23:23');

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
