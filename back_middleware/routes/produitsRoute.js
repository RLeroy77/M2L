const express = require('express');
const router = express.Router();
const produitsController = require('../controllers/produitsController');
const middelwareAuth = require('../middleware/middleware');

router.get('/getAllProduits', middelwareAuth.withDBConnection, produitsController.GetAllProduits);
router.get('/getProduitById/:id', middelwareAuth.withDBConnection, produitsController.GetProduitById);
router.put('/editProduitQuantite', middelwareAuth.withDBConnection, produitsController.EditProduitQuantite);

module.exports = router;