const express = require('express');
const router = express.Router();
const verifierToken = require('../middleware/verifierToken');
const AdminService = require('../services/AdminService');

async function verifierAdmin(req, res, next) {
    try {
        await AdminService.verifierAdmin(req.user.userId);
        next();
    } catch (error) {
        res.status(error.statut || 403).json({ message: error.message });
    }
}

router.get('/joueurs', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const joueurs = await AdminService.listerJoueurs();
        res.json(joueurs);
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

router.patch('/joueurs/:id/acces', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const result = await AdminService.modifierAcces(req.params.id, req.body.aAcces, req.user.userId);
        res.json(result);
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

router.get('/joueurs/:id/fiche', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const joueurs = await AdminService.listerJoueurs();
        const joueur = joueurs.find(j => j.id === parseInt(req.params.id));

        if (!joueur || !joueur.fiche) {
            return res.status(404).json({ message: 'Fiche introuvable' });
        }

        res.json(joueur.fiche);
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

router.get('/logs', verifierToken, verifierAdmin, async (req, res) => {
    try {
        const logs = await AdminService.listerLogs();
        res.json(logs);
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

module.exports = router;