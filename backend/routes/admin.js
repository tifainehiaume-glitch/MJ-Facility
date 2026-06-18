const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Fiche = require('../models/fiche');
const verifierToken = require('../middleware/verifierToken');

async function verifierAdmin(req, res, next) {
    const user = await User.findByPk(req.user.userId);

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
    }

    next();
}

router.get('/joueurs', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const users = await User.findAll({
            where: { role: 'joueur' }
        });

        const joueurs = await Promise.all(
            users.map(async (user) => {
                let fiche = null;
                if (user.ficheId) {
                    fiche = await Fiche.findById(user.ficheId);
                }

                return {
                    id: user.id,
                    pseudo: user.pseudo,
                    email: user.email,
                    aAcces: user.aAcces,
                    fiche: fiche
                };
            })
        );

        res.json(joueurs);
    } catch (error) {
        console.error('Erreur récupération joueurs :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.patch('/joueurs/:id/acces', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { aAcces } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'Joueur introuvable' });
        }

        user.aAcces = aAcces;
        await user.save();

        res.json({ message: 'Accès mis à jour' });

    } catch (error) {
        console.error('Erreur mise à jour accès :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/joueurs/:id/fiche', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user || !user.ficheId) {
            return res.status(404).json({ message: 'Fiche introuvable' });
        }

        const fiche = await Fiche.findById(user.ficheId);

        res.json(fiche);

    } catch (error) {
        console.error('Erreur récupération fiche :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;