<h1 align="center">Projet Activite Professionnelle: Application légère avec une API E-commerce pour l'Association Sportive de la Maison des Ligues de Lorraine</h1>

<h2>Description</h2>

Ce projet est une activité professionnelle réalisée dans le cadre de mon BTS SIO à l'IPSSI. L'objectif est de développer 
une application web e-commerce en utilisant React.js pour le front-end et Node.js pour le back-end, destinée à
l'association sportive de la Maison des Ligues de Lorraine. L'application permettra aux membres de l'association de
parcourir et de une simuler l'achat de produits liés à leurs activités sportives, ainsi qu'à l'administration de gérer les
produits, les commandes et les utilisateurs.

<h2>Fonctionnalites</h2>

- Interface utilisateur conviviale permettant aux membres de l'association de parcourir les produits, de les ajouter
au panier et de passer des commandes.
- Système d'authentification sécurisé pour les membres, avec des fonctionnalités telles que l'inscription et la
connexion.
- Tableau de bord administratif permettant à l'administration de gérer les produits, les commandes et les
utilisateurs, avec des fonctionnalités telles que l'ajout, la modification et la suppression.

<h2>Technologies Utilisées</h2>

- **Front-end** : React, React Router Dom, Fetch
- **Back-end** : Node.js, Express.js, MySQL
- **Authentification et Sécurité** : JSON Web Tokens (JWT), Bcrypt.js
- **Autres Outils** : Git/GitHub pour le contrôle de version, dotenv pour la gestion des variables d'environnement

<h2>Installation</h2>

1. Cloner le repository GitHub sur votre machine locale.
2. Installer les dependances front-end et back-end en executant `npm install` à la racine du dossier `front/` et du dossier `back/` .
3. Configurer les variables d'environnement en reprenant le modèle `.env` (`.env.exemple`).
4. Lancer le serveur back-end en exécutant `nodemon` à la racine du dossier `back/` .
5. Lancer le serveur front-end en exécutant `npm start` à la racine du dossier `front/` .
6. Un compte administrateur est déjà disponible pour tester l'application. Utilisateur : `u test` et Mot de Passe : `mdptest` .
