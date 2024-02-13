const express = require('express');
const router = express.Router();
const produitsController = require('../controllers/produitsController');
const middelwareAuth = require('../middleware/middleware');

router.get('/getAllProduits', middelwareAuth.WithDBConnection, produitsController.GetAllProduits);
router.get('/getProduitById/:id', middelwareAuth.WithDBConnection, produitsController.GetProduitById);
router.put('/editProduitQuantite', middelwareAuth.WithDBConnection,middelwareAuth.Authentificator, produitsController.EditProduitQuantite);

module.exports = router;