const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const middelwareAuth = require('../middleware/middleware');

router.get('/getUserRole/:id', middelwareAuth.withDBConnection, usersController.GetUserRole);
router.get('/getUserName/:id', middelwareAuth.withDBConnection, usersController.GetUserName);

module.exports = router;