const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Fiche = require('../models/fiche');
const verifierToken = require('../middleware/verifierToken');

router.get('/', verifierToken, async (req, res) => {
    try {

        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        let fiche = null;
        if (user.ficheId) {
            fiche = await Fiche.findById(user.ficheId);
        }

        res.json({
            pseudo: user.pseudo,
            email: user.email,
            aAcces: user.aAcces,
            fiche: fiche
        });

    } catch (error) {
        console.error('Erreur récupération profil :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.post('/fiche', verifierToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        if (!user.aAcces) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        if (user.ficheId) {
            await Fiche.findByIdAndUpdate(user.ficheId, req.body);
        } else {
            const nouvelleFiche = await Fiche.create(req.body);
            user.ficheId = nouvelleFiche._id.toString();
            await user.save();
        }

        res.json({ message: 'Fiche sauvegardé :' });

    } catch (error) {
        console.error('Erreur sauvegarde fiche :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;