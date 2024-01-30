const express = require('express');
const router = express.Router();
const adminUsersController = require('../../controllers/admin/adminUsersController');
const middelwareAuth = require('../../middleware/middleware');

router.get('/getAllUsers', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, middelwareAuth.CheckRole, adminUsersController.GetAllUsers);
router.put('/editUserRole/:id', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, middelwareAuth.CheckRole, adminUsersController.EditUserRole);
router.delete('/deleteUser/:id', middelwareAuth.WithDBConnection, middelwareAuth.Authentificator, middelwareAuth.CheckRole, adminUsersController.DeleteUser);

module.exports = router;