const Fiche = require('../models/fiche');

class FicheService {
    async charger(ficheId) {
        const fiche = await Fiche.findById(ficheId);
        return fiche;
    }

    async sauvegarder(ficheId, donnees) {
        if (ficheId) {
            await Fiche.findByIdAndUpdate(ficheId, donnees);
            return { ficheId, nouveau: false };
        } else {
            const nouvelleFiche = await Fiche.create(donnees);
            return { ficheId: nouvelleFiche._id.toString(), nouveau: true }; 
        }
    }
}

module.exports = new FicheService();