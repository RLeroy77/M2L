const express = require('express');
const router = express.Router();
const commandesController = require('../controllers/commandesController');
const middelwareAuth = require('../middleware/middleware');

router.post('/getNombreCommandeByData', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, commandesController.GetNombreCommandeByData)
router.post('/addProduitCommande', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, commandesController.AddProduitCommande);
router.put('/editProduitCommande', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, commandesController.EditProduitCommande);

module.exports = router;