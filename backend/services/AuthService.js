const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user');

class AuthService {
    async inscrire(pseudo, email, password) {
        const existant = await User.findOne({
            where: {
                [Op.or]: [{ pseudo }, { email }]
            }
        });

        if (existant) {
            const error = new Error('Pseudo ou Email déjà utilisé');
            error.statut = 400;
            throw error;
        }

        const passwordHache = await bcrypt.hash(password, 10);

        await User.create({ pseudo, email, password: passwordHache });

        return { message: 'Inscription réussie '};
    }

    async connecter(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            const error = new Error('Email ou mot de passe incorrect');
            error.statut = 401;
            throw error;
        }

        const motDePasseValide = await bcrypt.compare(password, user.password);

        if (!motDePasseValide) {
            const error = new Error('Email ou mot de passe incorrect');
            error.statut = 401;
            throw error;
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return { token, role: user.role };
    }
}

module.exports = new AuthService();