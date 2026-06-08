const joueur = [
    {
        id: "user_1",
        pseudo: "JohnDoe",
        email: "johndoe@example.com",
        aAcces: true,
        fiche: {
            nom: "Geralt de Riv", race: "Sorceleur", genre: "Homme",
            age: 95, terre: "Kaer Morhen", statut: "Connaissance", 
            stats: {
                int: 7, ref: 9, dex: 8, cor: 8, vit: 7, emp: 5, tech: 6, vol: 6, cha: 6 },
            competences: [
                { nom: "Escrime", val: 10 },
                { nom: "Connaissance des monstres", val: 9 },
                { nom: "Esquive/Evasion", val: 8 },
                { nom: "Alchimie", val: 8 },
                { nom: "Survie", val: 7 },
                { nom: "Vigilance", val: 6 },
            ]
        }
    },
    {
        id: "user_2",
        pseudo: "JaneSmith",
        email: "janesmith@example.com",
        aAcces: true,
        fiche: {
            nom: "Yennefer de Vengerberg", race: "Sorcière", genre: "Femme",
            age: 94, terre: "Vengerberg", statut: "Incantation",
            stats: {
                int: 10, ref: 6, dex: 7, cor: 5, vit: 6, emp: 8, tech: 7, vol: 9, cha: 8 },
            competences: [
                { nom: "Incantation", val: 10 },
                { nom: "Education", val: 9 },
                { nom: "Résistance à la magie", val: 9 },
                { nom: "Persuasion", val: 8 },
                { nom: "Déduction", val: 8 },
                { nom: "Rituels", val: 7 },
            ]
        }
    },
    {
        id: "user_3",
        pseudo: "BobBrown",
        email: "bobbrown@example.com",
        aAcces: false,
        fiche: null
    },
    {
        id: "user_4",
        pseudo: "AliceGreen",
        email: "alicegreen@example.com",
        aAcces: false,
        fiche: null
    },
    {
        id: "user_5",
        pseudo: "CharlieBlack",
        email: "charlieblack@example.com",
        aAcces: false,
        fiche: null
    },
];

/* mise à jour des statistiques */

function updateStats() {
    document.getElementById('nb-total').textContent = joueurs.length;
    document.getElementById('nb-autorises').textContent = joueurs.filter(j => j.aAcces).length;
    document.getElementById('nb-attente').textContent = joueurs.filter(j => !j.aAcces).length;
}

/* afficher la liste des joueurs */
function afficherJoueurs(liste) {
    const conteneur = document.getElementById('liste-joueurs');
    const messageVide = document.getElementById('message-vide');

    conteneur.innerHTML = '';

    if (liste.length === 0) {
        messageVide.style.display = 'flex';
        return;
    }

    messageVide.style.display = 'none';

    liste.forEach(joueur => {
        const carte = document.createElement('div');
        carte.className = `carte-joueur ${joueur.aAcces ? 'autorise' : 'en-attente'}`;

        let badgeHTML = '';
        if (!joueur.aAcces) {
            badgeHTML = '<span class="badge en-attente">En attente</span>';
        } else if (!joueur.fiche) {
            badgeHTML = '<span class="badge sans-fiche">Pas de fiche</span>';
        } else {
            badgeHTML = '<span class="badge autorise">✦ Fiche créée</span>';
        }
        
        const ficheDisabled = !joueur.fiche ? 'disabled' : '';
        const ficheTitle = !joueur.fiche ? 'title="Aucune fiche créée"' : '';

        carte.innerHTML = `
            <div class="joueur-info">
                <span class="joueur-pseudo">${joueur.pseudo}</span>
                <span class="joueur-email">${joueur.email}</span>
            </div>
            <div class="joueur-statut">${badgeHTML}</div>
            <div class="joueur-actions">
                <button 
                    type="button"
                    class="btn-voir-fiche"
                    onclick="ouvrirFiche('${joueur.id}')"
                    ${ficheDisabled}
                    ${ficheTitle}>
                    📜 Voir la fiche 
                </button>
                ${joueur.aAcces
                    ? `<button type="button" class="btn-revoquer" onclick="revoquerAcces('${joueur.id}')">Révoquer</button>`
                    : `<button type="button" class="btn-autoriser" onclick="donnerAcces('${joueur.id}')">✦ Autoriser</button>`
                }
            </div>
        `;

        conteneur.appendChild(carte);
    });
}

/* modal */

function ouvrirFiche(joueurId) {
    const joueur = joueurs.find(j => j.id === joueurId);
    if (!joueur || !joueur.fiche) return;

    const f = joueur.fiche;

    document.getElementById('modal-title').textContent =
        `Fiche de ${joueur.pseudo} — ${f.nom}`;

    document.getElementById('modal-body').innerHTML = `

        <div class="modal-section">
            <div class="modal-section-title">Identité</div>
            <div class="modal-grille-3">
                <div class="modal-champ">
                    <span class="modal-label">Nom</span>
                    <span class="modal-valeur">${f.nom}</span>
                </div>
                <div class="modal-champ">
                    <span class="modal-label">Race</span>
                    <span class="modal-valeur">${f.race}</span>
                </div>
                <div class="modal-champ">
                    <span class="modal-label">Genre</span>
                    <span class="modal-valeur">${f.genre}</span>
                </div>
                <div class="modal-champ">
                    <span class="modal-label">Âge</span>
                    <span class="modal-valeur">${f.age} ans</span>
                </div>
                <div class="modal-champ">
                    <span class="modal-label">Terre natale</span>
                    <span class="modal-valeur">${f.terre}</span>
                </div>
                <div class="modal-champ">
                    <span class="modal-label">Statut social</span>
                    <span class="modal-valeur">${f.statut}</span>
                </div>
            </div>
            <div class="modal-grille-2" style="margin-top: 8px;">
                <div class="modal-champ">
                    <span class="modal-label">Profession</span>
                    <span class="modal-valeur">${f.profession}</span>
                </div>
                <div class="modal-champ">
                    <span class="modal-label">Compétence exclusive</span>
                    <span class="modal-valeur">${f.competenceExclu}</span>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <div class="modal-section-titre">Statistiques</div>
            <div class="modal-stats-grille">
                ${Object.entries(f.stats).map(([cle, val]) => `
                    <div class="modal-stat-box">
                        <span class="modal-stat-nom">${cle.toUpperCase()}</span>
                        <span class="modal-stat-val">${val}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="modal-section">
            <div class="modal-section-titre">Compétences principales</div>
            <div class="modal-competences-grille">
                ${f.competences.map(c => `
                    <div class="modal-competence-ligne">
                        <span>${c.nom}</span>
                        <span class="modal-competence-score">${c.val}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.getElementById('modal').classList.add('open');
}

function fermerModal() {
    document.getElementById('modal').classList.remove('open');
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) fermerModal();
});

/* bouton fermer */
document.getElementById('modal-fermer').addEventListener('click', fermerModal);

/* autoriser/révoquer */

function donnerAcces(joueurId) {
    /* FAIRE LE FETCH APRES LE BACK END */
    /* await fetch(`/api/admin/joueurs/${joueurId}/acces`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + localStorage.getItem('token')
    //     },
    //     body: JSON.stringify({ aAcces: true })
    // }); */

    const joueur = joueur.find(j => j.id === joueurId);
    if (joueur) {
        joueur.aAcces = true;
        mettreAJourStats();
        afficherJoueurs(joueurs);
    }
}

function revoquerAcces(joueurId) {
    const joueur = joueurs.find(j => j.id === joueurId);
    if (joueur) {
        joueur.aAcces = false;
        mettreAJourStats();
        afficherJoueurs(joueurs);
    }
}

/* recherche */

document.getElementById('recherche').addEventListener('input', function() {
    const texte = this.value.trim().toLowerCase();
    const filtres = joueurs.filtrer(j =>
        j.pseudo.toLowerCase().includes(texte) ||
        j.email.toLowerCase().includes(texte)
    );
    afficherJoueurs(filtres);
});

/* deconnexion */

document.getElementById('btn-deconnexion').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/html/connexion.html';
});

/* initialisation */

mettreAJourStats();
afficherJoueurs(joueurs);