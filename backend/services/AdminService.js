const User = require('../models/user');
const FicheService = require('./FicheService');

class AdminService {
    async verifierAdmin(userId) {
        const user = await User.findByPk(userId);

        if (!user || user.role !== 'admin') {
            const error = new Error('Accès réservé aux administrateurs');
            error.statut = 403;
            throw error;
        }
    }

    async listerJoueurs() {
        const users = await User.findAll({ where: {role: 'joueur' } });

        const joueurs = await Promise.all(
            users.map(async (user) => {
                let fiche = null;
                if (user.ficheId) {
                    fiche = await FicheService.charger(user.ficheId);
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
        return joueurs;
    }
    async modifierAcces(id, aAcces) {
        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error('Joueur introuvable');
            error.statut = 404;
            throw error;
        }

        user.aAcces = aAcces;
        await user.save();

        return { message: 'Accès mis à jour'};
    }
}

module.exports = new AdminService();