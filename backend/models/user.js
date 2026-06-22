const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('joueur', 'admin'),
        defaultValue: 'joueur'
    },
    aAcces: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ficheId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: true
});

const Log = require('./log');

User.hasMany(Log, { foreignKey: 'adminId', as: 'logsAdmin' });
Log.belongsTo(User, { foreignKey: 'adminId', as: 'admin'});

User.hasMany(Log, { foreignKey: 'joueurId', as: 'logsJoueur' });
Log.belongsTo(User, { foreignKey: 'joueurId', as: 'joueur'});

module.exports = User;