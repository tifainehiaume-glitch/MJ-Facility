require('dotenv').config();

const express = required('express');
const mongoose = required('mongoose');
const cors = required('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* connexion mongoDB */

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connecté');
        creerAdminSiAbsent();
    })
    .catch(err => console.error('Erreur MongoDB :', err));

/* routes */

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profil', require('./routes/profil'));
app.use('/api/admin', require('./routes/admin'));

/* création admin au démarrage */

async function creerAdminSiAbsent() {
    const User = require('./models/User');
    const bcrypt = require('bcrypt');

    const adminExiste = await User.findOne({ role: 'admin'});

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
        console.log('Compte Admin déjà existant');
    }
}

/* démarrage du serveur */

app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});