const mongoose = require('mongoose');

const ficheSchema = new mongoose.Schema({

    /* identité */
    nom:                { type: String, default: '' },
    race:               { type: String, default: '' },
    genre:              { type: String, default: '' },
    age:                { type: String, default: '' },
    terre:              { type: String, default: '' },
    statut:             { type: String, default: '' },
    profession:         { type: String, default: '' },
    competenceExclu:    { type: String, default: '' },
    particularite:      { type: String, default: '' },

    stats: {
        int:    { type: Number, default: 5 },
        ref:    { type: Number, default: 5 },
        dex:    { type: Number, default: 5 },
        cor:    { type: Number, default: 5 }, 
        vit:    { type: Number, default: 5 },
        emp:    { type: Number, default: 5 },
        tech:   { type: Number, default: 5 },
        vol:    { type: Number, default: 5 },
        cha:    { type: Number, default: 5 },
        etou:   { type: Number, default: 0 },
        cou:    { type: Number, default: 0 },
        saut:   { type: Number, default: 0 }, 
        ps:     { type: Number, default: 0 },
        end:    { type: Number, default: 0 },
        enc:    { type: Number, default: 0 },
        rec:    { type: Number, default: 0 },
        poings: { type: Number, default: 0 },
        pieds:  { type: Number, default: 0 },
    },

    reputation:     { type: Number, default: 0 },
    progression:    { type: Number, default: 0 },

    /* compétences */
    competences: {
        type: Map,
        of: Number,
        default: {}
    },

    /* équipement */
    armes: {
        precision:      { type: String, default: '' },
        degats:         { type: String, default: '' },
        fiabilite:      { type: String, default: '' },
        mains:          { type: String, default: '' },
        portee:         { type: String, default: '' },
        effet:          { type: String, default: '' },
        dissimulation:  { type: String, default: '' },
        amelioration:   { type: String, default: '' },
        poids:          { type: String, default: '' }
    },

    armure: {
        type: Map,
        of: Number,
        default: {}
    },

    /* Notes */
    entrainement:   {type: String, default: '' },
    notes:          { type: String, default: '' },
    aptitudes:      { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Fiche', ficheSchema); 