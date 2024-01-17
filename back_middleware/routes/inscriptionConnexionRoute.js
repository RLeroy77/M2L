const express = require('express');
const router = express.Router();
const InscriptionConnexionController = require('../controllers/inscriptionConnexionController');
const middelwareAuth = require('../middleware/middleware')

//Route pour obtenir tous les utilisateurs
router.post('/inscription', middelwareAuth.withDBConnection, InscriptionConnexionController.Inscription);
router.post('/connexion', middelwareAuth.withDBConnection, InscriptionConnexionController.Connexion);

//Ajoutez d'autres routes au besoin

module.exports = router;