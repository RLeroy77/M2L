const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const inscriptionConnexionRoute = require('./routes/inscriptionConnexionRoute');
const adminProduitsRoute = require('./routes/admin/adminProduitsRoute');
const adminUsersRoute = require('./routes/admin/adminUsersRoute');
const commandesRoute = require('./routes/commandesRoute');
const produitsRoute = require('./routes/produitsRoute');
const usersRoute = require('./routes/usersRoute');

app.use(express.json());
app.use(cors());

app.use('/api/inscriptionConnexion', inscriptionConnexionRoute);
app.use('/api/adminProduits', adminProduitsRoute);
app.use('/api/adminUsers', adminUsersRoute);
app.use('/api/commandes', commandesRoute);
app.use('/api/produits', produitsRoute);
app.use('/api/users', usersRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 8000;

module.exports = app.listen(PORT);
