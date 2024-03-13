const db = require('../database/database');

//Route pour obtenir le rôle par ID utilisé dans App.jsx
exports.GetUserRole = async (req, res) => {
    const id = req.params.id;
    try {
        const [UserRole] = await db.pool.execute('SELECT admin FROM utilisateur WHERE id = ?', [id]);
        res.status(200).json(UserRole);
    } catch (error) {
        res.status(500).json({ error: `Erreur lors de la récupération du role de l'utilisateur ${id} ` });
    }
};

// Route pour obtenir un user_name par ID utilisé dans Navbar.jsx
exports.GetUserName = async (req, res) => {
    const id = req.params.id;
    try {
        const [UserName] = await db.pool.execute('SELECT user_name FROM utilisateur WHERE id = ?', [id]);
        res.status(200).json(UserName);
    } catch (error) {
        res.status(500).json({ error: `Erreur lors de la récupération du rôle de l'utilisateur ${id}` });
    }
};