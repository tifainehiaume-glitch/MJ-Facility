let joueurs = []; 

const competencesAdmin = [
    { items: [
        { nom: 'Connaissance de la rue',    name:'connaissance-rue'},
        { nom: 'Connaissance des monstres', name:'connaissance-monstres'},
        { nom: 'Déduction',                 name:'deduction'},
        { nom: 'Education',                 name:'education'},
        { nom: 'Enseignement',              name:'enseignement'},
        { nom: 'Etiquette',                 name:'etiquette'},
        { nom: 'Langue ancienne',           name:'langue-ancienne'},
        { nom: 'Langue commune',            name:'langue-commune'},
        { nom: 'Langue naine',              name:'langue-naine'},
        { nom: 'Négoce',                    name:'negoce'},
        { nom: 'Survie',                    name:'survie'},
        { nom: 'Tactique',                  name:'tactique'},
        { nom: 'Vigilance',                 name:'vigilance'},
        { nom: 'Bagarre',                   name:'bagarre'},
        { nom: 'Bâton/Lance',               name:'baton-lance'},
        { nom: 'Equitation',                name:'equitation'},
        { nom: 'Escrime',                   name:'escrime'},
        { nom: 'Esquive/Evasion',           name:'esquive'},
        { nom: 'Lames courtes',             name:'lames-courtes'},
        { nom: 'Mêlée',                     name:'melee'},
        { nom: 'Navigation',                name:'navigation'},
        { nom: 'Adresse',                   name:'adresse'},
        { nom: 'Arbalète',                  name:'arbalete'},
        { nom: 'Archerie',                  name:'archerie'},
        { nom: 'Athlétisme',                name:'athletisme'},
        { nom: 'Furtivité',                 name:'furtivite'},
        { nom: 'Physique',                  name:'physique'},
        { nom: 'Résilience',                name:'resilience'},
        { nom: 'Beaux-arts',                name:'beaux-arts'},
        { nom: 'Charisme',                  name:'charisme'},
        { nom: 'Commandement',              name:'commandement'},
        { nom: 'Duperie',                   name:'duperie'},
        { nom: 'Jeu',                       name:'jeu'},
        { nom: 'Persuasion',                name:'persuasion'},
        { nom: 'Psychologie',               name:'psychologie'},
        { nom: 'Représentation',            name:'representation'},
        { nom: 'Séduction',                 name:'seduction'},
        { nom: 'Stylisme',                  name:'stylisme'},
        { nom: 'Alchimie',                  name:'alchimie'},
        { nom: 'Artisanat',                 name:'artisanat'},
        { nom: 'Contrefaçon',               name:'contrefacon'},
        { nom: 'Crochetage',                name:'crochetage'},
        { nom: 'Déguisement',               name:'deguisement'},
        { nom: 'Fabrication de pièges',     name:'fabrication-pieges'},
        { nom: 'Premiers soins',            name:'premiers-soins'},
        { nom: 'Courage',                   name:'courage'},
        { nom: 'Envoûtement',               name:'envoutement'},
        { nom: 'Incantation',               name:'incantation'},
        { nom: 'Intimidation',              name:'intimidation'},
        { nom: 'Résistance à la contrainte',name:'resistance-contrainte'},
        { nom: 'Résistance à la magie',     name:'resistance-magie'},
        { nom: 'Rituels',                   name:'rituels'},
    ]}
];

const armeLabels = {
    precision:      'Précision',
    degats:         'Dégâts',
    fiabilite:      'Fiabilité',
    mains:          'Mains',
    portee:         'Portée',
    effet:          'Effet',
    dissimulation:  'Dissimulation',
    amelioration:   'Amélioration',
    poids:          'Poids'
};

const localisationsArmureAdmin = ['Tête','Torse','Bras droit','Bras gauche','Jambe droite','Jambe gauche'];

async function chargerJoueurs() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/connexion.html';
        return;
    }

    try {
        const reponse = await fetch('/api/admin/joueurs', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!reponse.ok) {
            window.location.href = '/connexion.html';
            return;
        }

        joueurs = await reponse.json();
        updateStats();
        afficherJoueurs(joueurs);

    } catch (error) {
        console.error('Erreur chargement joueurs :', error);
    }
}

/* statistiques */

function updateStats() {
    document.getElementById('nb-total').textContent     = joueurs.length;
    document.getElementById('nb-autorises').textContent = joueurs.filter(j => j.aAcces).length;
    document.getElementById('nb-attente').textContent   = joueurs.filter(j => !j.aAcces).length;
}

/* afficher la liste */

function afficherJoueurs(liste) {
    const conteneur   = document.getElementById('liste-joueurs');
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

        const getBadge = (joueur) => {
            if (!joueur.aAcces) return '<span class="badge en-attente">En attente</span>';
            if (!joueur.fiche)  return '<span class="badge sans-fiche">Pas de fiche</span>';
            return '<span class="badge autorise">✦ Fiche créée</span>';
        };

        const badgeHTML     = getBadge(joueur);
        const ficheDisabled = !joueur.fiche ? 'disabled' : '';
        const ficheTitle    = !joueur.fiche ? 'title="Aucune fiche créée"' : '';

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

async function ouvrirFiche(joueurId) {
    const token = localStorage.getItem('token');

    try {
        const reponse = await fetch(`/api/admin/joueurs/${joueurId}/fiche`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!reponse.ok) return;

        const f = await reponse.json();
        const joueur = joueurs.find(j => j.id == joueurId);

        document.getElementById('modal-title').textContent =
            `Fiche de ${joueur ? joueur.pseudo : ''} — ${f.name || ''}`;

        document.getElementById('modal-body').innerHTML = `
            <div class="modal-section">
                <div class="modal-section-title">Identité</div>
                <div class="modal-grille-3">
                    <div class="modal-champ">
                        <span class="modal-label">Nom</span>
                        <span class="modal-valeur">${f.name || '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Race</span>
                        <span class="modal-valeur">${f.race || '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Genre</span>
                        <span class="modal-valeur">${f.genre || '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Âge</span>
                        <span class="modal-valeur">${f.age ? f.age + ' ans' : '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Terre natale</span>
                        <span class="modal-valeur">${f.terre || '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Statut social</span>
                        <span class="modal-valeur">${f.statut || '—'}</span>
                    </div>
                </div>
                <div class="modal-grille-2 modal-grille-extra">
                    <div class="modal-champ">
                        <span class="modal-label">Profession</span>
                        <span class="modal-valeur">${f.profession || '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Compétence exclusive</span>
                        <span class="modal-valeur">${f.competenceExclu || '—'}</span>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-title">Statistiques</div>
                <div class="modal-stats-grille">
                    ${f.stats ? Object.entries(f.stats).map(([cle, val]) => `
                        <div class="modal-stat-box">
                            <span class="modal-stat-nom">${cle.toUpperCase()}</span>
                            <span class="modal-stat-val">${val}</span>
                        </div>
                    `).join('') : '—'}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-title">Compétences formées</div>
                <div class="modal-competences-grille">
                    ${competencesAdmin
                        .flatMap(cat => cat.items)
                        .filter(item => (f.competences?.[item.name] || 0) > 0)
                        .map(item => `
                            <div class="modal-competences-line">
                                <span>${item.nom}</span>
                                <span class="modal-competences-score">${f.competences[item.name]}</span>
                            </div>
                        `).join('') || '<span class="modal-valeur">Aucune compétence formée.</span>'}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-title">Équipement — Arme primaire</div>
                <div class="modal-grille-3">
                    ${Object.entries(armeLabels).map(([cle, label]) => `
                        <div class="modal-champ">
                            <span class="modal-label">${label}</span>
                            <span class="modal-valeur">${f.armes?.[cle] || '—'}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-title">Équipement — Armure</div>
                <div class="modal-grille-2">
                    ${localisationsArmureAdmin.map(loc => {
                        const cle = loc.toLowerCase().replace(/ /g, '-');
                        const pa = f.armure?.[`armure-${cle}-pa`] ?? 0;
                        const degats = f.armure?.[`armure-${cle}-degats`] ?? 0;
                        return `
                            <div class="modal-champ">
                                <span class="modal-label">${loc}</span>
                                <span class="modal-valeur">PA ${pa} · Dégâts ${degats}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>

            <div class="modal-section">
                <div class="modal-section-title">Entraînement &amp; Notes</div>
                <div class="modal-grille-2">
                    <div class="modal-champ">
                        <span class="modal-label">Entraînement</span>
                        <span class="modal-valeur">${f.entrainement || '—'}</span>
                    </div>
                    <div class="modal-champ">
                        <span class="modal-label">Notes</span>
                        <span class="modal-valeur">${f.notes || '—'}</span>
                    </div>
                </div>
                <div class="modal-champ" style="margin-top:8px">
                    <span class="modal-label">Aptitudes professionnelles</span>
                    <span class="modal-valeur">${f.aptitudes || '—'}</span>
                </div>
            </div>
        `;

        document.getElementById('modal').classList.add('open');

    } catch (error) {
        console.error('Erreur chargement fiche :', error);
    }
}

function fermerModal() {
    document.getElementById('modal').classList.remove('open');
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) fermerModal();
});

document.getElementById('modal-close').addEventListener('click', fermerModal);

/* authoriser et refuser */

async function donnerAcces(joueurId) {
    try {
        const reponse = await fetch(`/api/admin/joueurs/${joueurId}/acces`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ aAcces: true })
        });

        if (reponse.ok) {
            await chargerJoueurs(); 
        }

    } catch (error) {
        console.error('Erreur autorisation :', error);
    }
}

async function revoquerAcces(joueurId) {
    try {
        const reponse = await fetch(`/api/admin/joueurs/${joueurId}/acces`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ aAcces: false })
        });

        if (reponse.ok) {
            await chargerJoueurs(); 
        }

    } catch (error) {
        console.error('Erreur révocation :', error);
    }
}

/* recherche */

document.getElementById('recherche').addEventListener('input', function() {
    const texte = this.value.trim().toLowerCase();
    const filtres = joueurs.filter(j =>
        j.pseudo.toLowerCase().includes(texte) ||
        j.email.toLowerCase().includes(texte)
    );
    afficherJoueurs(filtres);
});

/* déconnexion */

document.getElementById('btn-deconnexion').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/connexion.html';
});

/* initialisation */

chargerJoueurs(); 