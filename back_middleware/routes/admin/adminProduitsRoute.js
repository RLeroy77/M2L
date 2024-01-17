const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminProduitsController = require('../../controllers/admin/adminProduitsController')
const middelwareAuth = require('../../middleware/middleware')

// Configuration de multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../front/public/images/produits'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    },
});

const upload = multer({ storage: storage });

router.post('/addProduit', middelwareAuth.withDBConnection, upload.single('image'), adminProduitsController.addProduit);
router.put('/editProduit/:id', middelwareAuth.withDBConnection, adminProduitsController.editProduit);
router.delete('/deleteProduit/:id', middelwareAuth.withDBConnection, adminProduitsController.DeleteProduit);




module.exports = router;