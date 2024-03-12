const db = require('../database/database');

//Route pour savoir si dans la table commande il y a une commande asscocié à un id_utilisateur et à un id_produit dans Panier.jsx
exports.GetNombreCommandeByData = async (req, res) => {
    try {
        const { id_utilisateur, id_produit, quantite } = req.body;
        if (!id_utilisateur || !id_produit || !quantite) {
            return res.status(400).json({ message: "L'ID utilisateur et/ou l'ID produit et/ou la quantité ne sont pas fournis pour rechercher la commande." });
        }
        const [resultat] = await db.pool.execute(
            'SELECT COUNT(*) AS nombreCommandes FROM commande WHERE id_utilisateur = ? AND id_produit = ?',
            [id_utilisateur, id_produit]
        )
        const nombreCommandes = resultat[0].nombreCommandes;
        res.status(200).json(nombreCommandes);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du nombre de commandes." });
    }
}

//Route pour ajouté les éléments à la table commande dans Panier.jsx
exports.AddProduitCommande = async (req, res) => {
    try {
        const { id_utilisateur, id_produit, quantite } = req.body;
        if (!id_utilisateur || !id_produit || !quantite) {
            return res.status(400).json({ message: "L'ID utilisateur et/ou l'ID produit et/ou la quantité ne sont pas fournis pour un élément de la commande." });
        }
        await db.pool.execute(
            'INSERT INTO commande (id_utilisateur, id_produit, quantite) VALUES (?, ?, ?)',
            [id_utilisateur, id_produit, quantite]
        );
        res.status(200).json({ message: "Données du produit ajoutées à la commande avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout des données du produit à la commande" });
    }
};

//Route pour mettre à jour la quantité du produit dans la commande dans Panier.jsx
exports.EditProduitCommande = async (req, res) => {
    try {
        const { id_utilisateur, id_produit, quantite } = req.body;
        if (!id_utilisateur || !id_produit || !quantite) {
            return res.status(400).json({ message: "L'ID utilisateur et/ou l'ID produit et/ou la quantité ne sont pas fournis pour un élément de la commande." });
        }
        const [commande] = await db.pool.execute(
            'SELECT * FROM commande WHERE id_utilisateur = ? AND id_produit = ?',
            [id_utilisateur, id_produit]
        );
        if (!commande.length) {
            return res.status(404).json({ message: `Commande avec l'id utilisateur : ${id_utilisateur} et l'id produit : ${id_produit} non trouvé.` });
        }
        const nouvelleQuantite = commande[0].quantite + quantite;
        await db.pool.execute(
            'UPDATE commande SET quantite = ? WHERE id_utilisateur = ? AND id_produit = ?',
            [nouvelleQuantite, id_utilisateur, id_produit]
        );
        res.status(200).json({ message: `Quantité de la commande avec l'id utilisateur : ${id_utilisateur} et l'id produit : ${id_produit} mise à jour avec succès` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la quantité de la commande" });
    }
}