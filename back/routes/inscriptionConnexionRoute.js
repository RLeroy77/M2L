const express = require('express');
const router = express.Router();
const InscriptionConnexionController = require('../controllers/inscriptionConnexionController');
const middelwareAuth = require('../middleware/middleware');

router.post('/inscription', middelwareAuth.WithDBConnection, InscriptionConnexionController.Inscription);
router.post('/connexion', middelwareAuth.WithDBConnection, InscriptionConnexionController.Connexion);

module.exports = router;