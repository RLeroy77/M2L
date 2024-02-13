const express = require('express');
const router = express.Router();
const InscriptionConnexionController = require('../controllers/inscriptionConnexionController');
const middelwareAuth = require('../middleware/middleware')

//Route pour obtenir tous les utilisateurs
router.post('/inscription', middelwareAuth.WithDBConnection, InscriptionConnexionController.Inscription);
router.post('/connexion', middelwareAuth.WithDBConnection, InscriptionConnexionController.Connexion);

//Ajoutez d'autres routes au besoin

module.exports = router;