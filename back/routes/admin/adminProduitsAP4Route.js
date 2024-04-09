const express = require('express');
const router = express.Router();
const adminProduitsAP4Controller = require('../../controllers/admin/adminProduitsAP4Controller')
const middelwareAuth = require('../../middleware/middleware')

router.get('/getAllProduits', middelwareAuth.WithDBConnection, adminProduitsAP4Controller.GetAllProduits);
router.post('/addProduit', middelwareAuth.WithDBConnection, adminProduitsAP4Controller.addProduit);
router.put('/editProduit/:id', middelwareAuth.WithDBConnection, adminProduitsAP4Controller.editProduit);
router.delete('/deleteProduit/:id', middelwareAuth.WithDBConnection, adminProduitsAP4Controller.DeleteProduit);
router.post('/connexion', middelwareAuth.WithDBConnection, adminProduitsAP4Controller.Connexion);



module.exports = router;