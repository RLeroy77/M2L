const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const middelwareAuth = require('../middleware/middleware');

router.get('/getUserRole/:id', middelwareAuth.WithDBConnection, usersController.GetUserRole);
router.get('/getUserName/:id', middelwareAuth.WithDBConnection, usersController.GetUserName);

module.exports = router;