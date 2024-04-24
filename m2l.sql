-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : mer. 24 avr. 2024 à 12:06
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
  `id_utilisateur` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `id_produit` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `quantite` int DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`,`id_produit`),
  KEY `id_produit` (`id_produit`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_mise_a_jour` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `nom`, `prix`, `quantite`, `description`, `date_creation`, `date_mise_a_jour`) VALUES
('1eda2527-6f40-430c-ad9f-e45a6d977cd4', 'Gants de boxe en cuir véritable', '80.00', 80, 'Ces gants de boxe sont fabriqués à partir de cuir véritable de haute qualité, offrant une durabilité et une protection optimales lors de vos séances d\'entraînement. Leur conception ergonomique assure un ajustement confortable et une absorption maximale des chocs.', '2024-04-24 08:56:55', '2024-04-24 10:56:56'),
('9240abe1-791e-4daa-bcbb-806a913e9a7f', 'Sac de frappe professionnel', '150.00', 150, 'Ce sac de frappe est idéal pour améliorer votre technique de frappe et votre puissance. Fabriqué à partir de matériaux résistants, il est conçu pour supporter les séances d\'entraînement les plus intenses. Sa taille généreuse offre une surface de frappe suffisante pour travailler tous les coups.', '2024-04-24 09:00:13', '2024-04-24 11:00:13'),
('4b5c1380-493e-420a-95a7-fc777dded55f', 'Protège-dents thermoformable', '20.00', 20, 'Protégez vos dents et votre mâchoire avec ce protège-dents thermoformable. Conçu pour s\'adapter parfaitement à votre bouche, il offre un confort optimal et une protection supérieure lors de vos combats et entraînements.', '2024-04-24 09:01:43', '2024-04-24 11:01:43'),
('e2aeb179-b372-49e1-a87e-217a8aa56a27', 'Corde à sauter de vitesse professionnelle', '25.00', 25, 'Améliorez votre vitesse, votre agilité et votre coordination avec cette corde à sauter de qualité professionnelle. Son design léger et ses poignées antidérapantes en font l\'accessoire parfait pour vos séances d\'entraînement cardio.', '2024-04-24 09:22:04', '2024-04-24 11:22:04'),
('201ded38-9f3f-4249-8d81-15098768e1f1', 'Casque de boxe avec protection du menton', '60.00', 60, 'Ce casque de boxe offre une protection complète pour votre tête et votre menton, réduisant ainsi le risque de blessures lors de vos sparrings. Sa conception ajustable garantit un ajustement sûr et confortable.', '2024-04-24 09:23:31', '2024-04-24 11:23:31'),
('132210a7-10a7-430c-835e-476771a66266', 'Bandes de boxe élastiques', '10.00', 10, 'Enveloppez vos mains dans ces bandes élastiques avant d\'enfiler vos gants de boxe pour un soutien supplémentaire et une protection accrue de vos poignets et de vos articulations.', '2024-04-24 09:26:33', '2024-04-24 11:26:33'),
('6136cc1b-c5b7-46f1-8c98-42d66a75a880', 'Short de boxe Thai respirant', '35.00', 35, 'Conçu pour offrir un confort et une liberté de mouvement optimaux, ce short de boxe Thai est fabriqué à partir de tissu respirant qui évacue l\'humidité pour vous garder au sec pendant vos combats et entraînements.', '2024-04-24 09:27:33', '2024-04-24 11:27:33'),
('16fc7b80-c46e-47ab-9051-a59493434317', 'Protège-tibias et pieds en mousse haute densité', '30.00', 30, 'Protégez vos tibias et vos pieds des coups avec ces protège-tibias en mousse haute densité. Légers et durables, ils offrent une protection essentielle lors de vos séances de sparring et de combat.', '2024-04-24 09:28:36', '2024-04-24 11:28:36'),
('54b306e4-77c1-4dd3-98ed-64f6fc21721a', 'Rouleau de massage pour les muscles', '15.00', 15, 'Apaisez vos muscles fatigués et réduisez les tensions avec ce rouleau de massage ergonomique. Parfait pour la récupération après l\'entraînement, il favorise la circulation sanguine et soulage les douleurs musculaires.', '2024-04-24 09:31:14', '2024-04-24 11:31:14'),
('dee38852-b3ec-4d11-9a6a-7c21005c5c2e', 'Montre chronomètre de boxe', '40.00', 40, 'Restez sur la bonne voie avec ce chronomètre de boxe multifonction. Doté de fonctions de chronométrage précises, de compte à rebours et d\'intervalle, il vous permet de contrôler efficacement votre temps d\'entraînement et de repos', '2024-04-24 09:32:15', '2024-04-24 11:32:15');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_mise_a_jour` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_name` (`user_name`(100))
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `user_name`, `date_creation`, `date_mise_a_jour`, `mot_de_passe`, `admin`) VALUES
('ada9eaac-eefe-48e7-952f-b185a3320b6e', 'LEROY', 'Rémy', 'RDieFox', '2024-01-17 10:25:41', '2024-03-13 08:27:32', '$2b$10$Am/3OOLo0JmbJgC84yAcjurcZwpgvaLTh5YUQmJAI.aF72X5QsPBm', 0),
('dba007f3-82fc-47b7-9766-465a88b6dd93', 'n test', 'p test', 'u test', '2023-11-20 12:05:50', '2024-03-13 08:27:14', '$2b$10$e66K.e0jiMVjhk1Kchy0bOBMINOcuQEQgkHNQOmieQi1v3lJ7dMDq', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
