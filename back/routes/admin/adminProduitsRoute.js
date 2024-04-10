const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const adminProduitsController = require('../../controllers/admin/adminProduitsController')
const middelwareAuth = require('../../middleware/middleware')

// Configuration de multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    },
});

const upload = multer({ storage: storage });

router.post('/addProduit', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, middelwareAuth.CheckRole, upload.single('image'), adminProduitsController.addProduit);
router.put('/editProduit/:id', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, middelwareAuth.CheckRole, adminProduitsController.editProduit);
router.delete('/deleteProduit/:id', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, middelwareAuth.CheckRole, adminProduitsController.DeleteProduit);




module.exports = router;