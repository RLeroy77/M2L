const db = require('../../database/database');
const jwt = require('jsonwebtoken');

// Route pour obtenir toutes les utilisateurs dans AdminUser.jsx
exports.GetAllUsers = async (req, res) => {
    try {
        console.log("Lancement de la requête");
        const [Utilisateurs] = await db.pool.execute('SELECT id, nom, prenom, user_name, date_creation, date_mise_a_jour, admin FROM utilisateur');
        console.log(Utilisateurs);
        res.status(200).json(Utilisateurs);
    } catch (err) {
        console.log(err);
        res.status(500).send("Erreur lors de l'exécution de la requête");
    }
};

// Route pour mettre à jour le rôle d'un utilisateur fonction de son ID dans AdminUser.jsx
exports.EditUserRole = async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si l'utilisateur existe avant de le mettre à jour
        const [existingUser] = await db.pool.execute('SELECT id FROM utilisateur WHERE id = ?', [id]);
        if (existingUser.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // Récupérer la nouvelle valeur pour le rôle (admin) depuis le corps de la requête
        const newAdminValue = req.body.admin;
        // Mettre à jour le rôle de l'utilisateur dans la base de données
        await db.pool.execute('UPDATE utilisateur SET admin = ? WHERE id = ?', [newAdminValue, id]);
        // Envoyer une réponse de succès
        res.status(200).json({ message: "Rôle utilisateur mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du rôle" });
    }
};

// Route pour supprimer un utilisateur en fonction de son ID dans AdminUser.jsx
exports.DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        // Vérifier si l'utilisateur existe avant de le supprimer
        const [rows] = await db.pool.execute('SELECT id FROM utilisateur WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        // L'utilisateur existe, procéder à la suppression
        await db.pool.execute('DELETE FROM utilisateur WHERE id = ?', [id]);
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
};