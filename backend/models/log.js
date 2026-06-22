const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Log = sequelize.define('Log', {
    id: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    action: {
        type: DataTypes.ENUM('acces_accorde', 'acces_revoque'),
        allowNull: false
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    joueurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: true,
    updatedAt: false
});

module.exports = Log;