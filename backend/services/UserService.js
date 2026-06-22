const User = require('../models/user');

class UserService {
    async trouverParId(id) {
        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error('Utilisateur introuvable');
            error.statut = 404;
        }

        return user;
    }

    async lierFiche(userId, ficheId) {
        const user = await User.findByPk(userId);
        user.ficheId = ficheId;
        await user.save();
    }
}

module.exports = new UserService();