const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
    console.log('Requête reçue dans auth.js :', req.method, req.url);
    next();
});

router.post('/inscription', async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;

        const existant = await User.findOne({
            where: { 
                [Op.or]: [{ pseudo }, { email }]
            }
        });

        if (existant) {
            return res.status(400).json({
                message: 'Pseudo ou Email déjà utilisé'
            });
        }

        const passwordHache = await bcrypt.hash(password, 10);

        await User.create({
            pseudo,
            email,
            password: passwordHache
        });

        res.status(201).json({
            message: 'Inscription réussie'
        });

    } catch (error) {
        console.error('Erreur inscription :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.post('/connexion', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        const motDePasseValide = await bcrypt.compare(password, user.password);

        if (!motDePasseValide) {
            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }

        );

            res.json({ token });

        } catch (error) {
            console.error('Erreur connexion :', error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
});

module.exports = router;