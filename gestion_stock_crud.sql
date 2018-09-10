-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  lun. 10 sep. 2018 à 10:57
-- Version du serveur :  5.6.38
-- Version de PHP :  7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `gestion_stock_crud`
--

-- --------------------------------------------------------

--
-- Structure de la table `marque`
--

CREATE TABLE `marque` (
  `id` smallint(3) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `marque`
--

INSERT INTO `marque` (`id`, `name`) VALUES
(1, 'renault'),
(2, 'tesla'),
(3, 'peugeot'),
(4, 'citroen'),
(5, 'bmw'),
(6, 'mercedes'),
(8, 'porsche'),
(10, 'audi');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id` smallint(3) UNSIGNED NOT NULL,
  `id_marque` smallint(3) UNSIGNED DEFAULT NULL,
  `nom` varchar(45) NOT NULL,
  `prix` decimal(13,2) DEFAULT '0.00',
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id`, `id_marque`, `nom`, `prix`, `description`) VALUES
(1, 1, 'Twingo', '11999.99', 'Petite Voiture citadine'),
(2, 1, 'Clio', '14000.00', 'Voiture Citadine'),
(3, 2, 'Roadster', '215000.00', 'Voiture de sport electrique, autonome'),
(5, 1, 'Kangoo', '16000.00', 'Vehicule utilitaire'),
(6, 1, 'talisman', '23000.00', 'voiture '),
(7, 10, 'a3', '35000.00', 'voiture de sport'),
(10, 10, 'a5', '40000.00', 'voiture de sport');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `marque`
--
ALTER TABLE `marque`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_marque` (`id_marque`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `marque`
--
ALTER TABLE `marque`
  MODIFY `id` smallint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` smallint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `fk_marque` FOREIGN KEY (`id_marque`) REFERENCES `marque` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
