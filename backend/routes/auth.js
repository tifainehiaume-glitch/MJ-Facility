const express = require('express');
const router = express.Router();
const AuthService = require('../services/AuthService');

router.post('/inscription', async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;
        const result = await AuthService.inscrire(pseudo, email, password);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

router.post('/connexion', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await AuthService.connecter(email, password);
        res.json(result);
    } catch (error) {
        res.status(error.statut || 500).json({ message: error.message || 'Erreur serveur' });
    }
});

module.exports = router;