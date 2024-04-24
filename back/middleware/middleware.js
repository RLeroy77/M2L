const db = require('../database/database');
const jwt = require('jsonwebtoken');

// Middleware pour gérer la connexion à la base de données
exports.WithDBConnection = async (req, res, next) => {
    try {
        req.db = db.pool;
        next(); // Passez à la route suivante
    } catch (err) {
        res.status(500).json({ error: "Erreur de connexion à la base de données" });
    }
};

//Verif si tu es bien authentifié
exports.Authentificator = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Acces denide.' });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({ error: 'Acces denide.' });
    }
};

exports.CheckRole = async (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Access denied.' });
            } else {
                const UserId = decoded.userId;
                const [rows] = await db.pool.execute('SELECT admin FROM utilisateur WHERE id = ?', [UserId])
                if (rows[0].admin == 0) {
                    res.status(401).json({ error: 'Access denied.' });
                } else {
                    next();
                }
            }
        })
    } else {
        res.status(401).json({ error: 'Access denied.' });
    }
};