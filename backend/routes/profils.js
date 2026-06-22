const express = require('express');
const router = express.Router();
const verifierToken = require('../middleware/verifierToken');
const UserService = require('../services/UserService');
const FicheService = require('../services/FicheService');

router.get('/', verifierToken, async (req, res) => {
    try {
        const user = await UserService.trouverParId(req.user.userId);

        let fiche = null;
        if (user.ficheId) {
            fiche = await FicheService.charger(user.ficheId);
        }

        res.json({
            pseudo: user.pseudo,
            email: user.email,
            aAcces: user.aAcces,
            fiche: fiche
        });
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

router.post('/fiche', verifierToken, async (req, res) => {
    try {
        const user = await UserService.trouverParId(req.user.userId);

        if (!user.aAcces) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        const result = await FicheService.sauvegarder(user.ficheId, req.body);

        if (result.nouveau) {
            await UserService.lierFiche(user.id, result.ficheId);
        }

        res.json({ message: 'Fiche sauvegardée' });
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

module.exports = router;