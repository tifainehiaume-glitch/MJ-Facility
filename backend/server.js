require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

/* connexion mongoDB */

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur MongoDB :', err));

/* connexion mysql */

sequelize.authenticate()
    .then(() => {
        console.log('MySQL connecté');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Tables MySQL synchronisées');
        creerAdminSiAbsent();
    })
    .catch(err => console.error('Erreur MySQL :', err));

/* routes */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profil', require('./routes/profils'));
app.use('/api/admin', require('./routes/admin'));

/* création admin au démarrage */

async function creerAdminSiAbsent() {
    const User = require('./models/user');
    const bcrypt = require('bcrypt');

    const adminExiste = await User.findOne({ where: {role: 'admin'} });

    if (!adminExiste) {
        await User.create({
            pseudo: 'Admin',
            email: process.env.ADMIN_EMAIL,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
            role: 'admin',
            aAcces: true    
        });
        console.log('Compte Admin crée');
    }  else {
        console.log('Compte admin déjà existant');
    }
}

/* démarrage du serveur */

app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});