const express = require('express');
const router = express.Router();
const adminUsersController = require('../../controllers/admin/adminUsersController');
const middelwareAuth = require('../../middleware/middleware');

router.get('/getAllUsers', middelwareAuth.withDBConnection, adminUsersController.GetAllUsers);
router.put('/editUserRole/:id', middelwareAuth.withDBConnection, adminUsersController.EditUserRole);
router.delete('/deleteUser/:id', middelwareAuth.withDBConnection, adminUsersController.DeleteUser);

module.exports = router;