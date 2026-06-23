const { sauvegarder } = require("../backend/services/FicheService");

const affichagePseudo = document.getElementById('affichage-pseudo');
const afficherEmail = document.getElementById('affichage-email');
const avatarInitiale = document.getElementById('avatar-initial');
const btnDeconnexion = document.getElementById('btn-deconnexion');

/* données statistiques */

const statsCaracteristiques = [
    { nom: 'INT',   id: 's-int',   min: 1,  max:10,  defaut: 1 },
    { nom: 'REF',   id: 's-ref',   min: 1,  max:10,  defaut: 1 },
    { nom: 'DEX',   id: 's-dex',   min: 1,  max:10,  defaut: 1 },
    { nom: 'COR',   id: 's-cor',   min: 1,  max:10,  defaut: 1 },
    { nom: 'VIT',   id: 's-vit',   min: 1,  max:10,  defaut: 1 },
    { nom: 'EMP',   id: 's-emp',   min: 1,  max:10,  defaut: 1 },
    { nom: 'TECH',   id: 's-tech',   min: 1,  max:10,  defaut: 1 },
    { nom: 'VOL',   id: 's-vol',   min: 1,  max:10,  defaut: 1 },
    { nom: 'CHA',   id: 's-cha',   min: 1,  max:10,  defaut: 1 },
];

const statsDerivees = [
    { nom: 'ETOU',     id: 's-etou',     min: 0,  max: null,  defaut: 0 },
    { nom: 'COU',      id: 's-cou',      min: 0,  max: null,  defaut: 0 },
    { nom: 'SAUT',     id: 's-saut',     min: 0,  max: null,  defaut: 0 },
    { nom: 'PS',       id: 's-ps',       min: 0,  max: null,  defaut: 0 },
    { nom: 'END',      id: 's-end',      min: 0,  max: null,  defaut: 0 },
    { nom: 'ENC',      id: 's-enc',      min: 0,  max: null,  defaut: 0 },
    { nom: 'REC',      id: 's-rec',      min: 0,  max: null,  defaut: 0 },
    { nom: 'Poings',   id: 's-poings',   min: 0,  max: null,  defaut: 0 },
    { nom: 'Pieds',    id: 's-pieds',    min: 0,  max: null,  defaut: 0 },
];

const competences = [
    {
        categorie: 'Intelligence',
        colonne: 0,
        items: [
            { nom: 'Connaissance de la rue',    name:'connaissance-rue'},
            { nom: 'Connaissance des monstres',  name:'connaissance-monstres'},
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
        ]
    },
    {
        categorie: 'Réflexes',
        colonne: 1,
        items: [
            { nom: 'Bagarre',              name:'bagarre'},
            { nom: 'Bâton/Lance',          name:'baton-lance'},
            { nom: 'Equitation',           name:'equitation'},
            { nom: 'Escrime',              name:'escrime'},
            { nom: 'Esquive/Evasion',      name:'esquive'},
            { nom: 'Lames courtes',        name:'lames-courtes'},
            { nom: 'Mêlée',                name:'melee'},
            { nom: 'Navigation',           name:'navigation'},
        ]
    },
    {
        categorie: 'Dextérité',
        colonne: 1,
        items: [
            { nom: 'Adresse',       name:'adresse'},
            { nom: 'Arbalète',      name:'arbalete'},
            { nom: 'Archerie',      name:'archerie'},
            { nom: 'Athlétisme',    name:'athletisme'},
            { nom: 'Furtivité',     name:'furtivite'},
        ]
    },
    {
        categorie: 'Corps',
        colonne: 1,
        items: [
            { nom: 'Physique',       name:'physique'},
            { nom: 'Résilience',     name:'resilience'},
        ]
    },
    {
        categorie: 'Empathie',
        colonne: 2,
        items: [
            { nom: 'Beaux-arts',        name:'beaux-arts'},
            { nom: 'Charisme',          name:'charisme'},
            { nom: 'Commandement',      name:'commandement'},
            { nom: 'Duperie',           name:'duperie'},
            { nom: 'Jeu',               name:'jeu'},
            { nom: 'Persuasion',        name:'persuasion'},
            { nom: 'Psychologie',       name:'psychologie'},
            { nom: 'Représentation',    name:'representation'},
            { nom: 'Séduction',         name:'seduction'},
            { nom: 'Stylisme',          name:'stylisme'},
        ]
    },
    {
        categorie: 'Technique',
        colonne: 2,
        items: [
            { nom: 'Alchimie',                   name:'alchimie'},
            { nom: 'Artisanat',                  name:'artisanat'},
            { nom: 'Contrefaçon',                name:'contrefacon'},
            { nom: 'Crochetage',                 name:'crochetage'},
            { nom: 'Déguisement',                name:'deguisement'},
            { nom: 'Fabrication de pièges',      name:'fabrication-pieges'},
            { nom: 'Premiers soins',             name:'premiers-soins'},
        ]
    },
    {
        categorie: 'Volonté',
        colonne: 2,
        items: [
            { nom: 'Courage',                         name:'courage'},
            { nom: 'Envoûtement',                     name:'envoutement'},
            { nom: 'Incantation',                     name:'incantation'},
            { nom: 'Intimidation',                    name:'intimidation'},
            { nom: 'Résistance à la contrainte',      name:'resistance-contrainte'},
            { nom: 'Résistance à la magie',           name:'resistance-magie'},
            { nom: 'Rituels',                         name:'rituels'},
        ]
    }
];

const localisationsArmure = [
    'Tête',
    'Torse',
    'Bras droit',
    'Bras gauche',
    'Jambe droite',
    'Jambe gauche',
];

/* option "autre" */

const champsAvecAutre = [
    { selectId: 'f-race',             autreId: 'f-race-autre' },
    { selectId: 'f-terre',            autreId: 'f-terre-autre' },
    { selectId: 'f-statut',           autreId: 'f-statut-autre' },
    { selectId: 'f-profession',       autreId: 'f-profession-autre' },
    { selectId: 'f-comp-exclu',       autreId: 'f-comp-exclu-autre' },
];

const valeursConnues = {
    'f-race':          ['humain' , 'elfe', 'nain', 'semi-elfe', 'sorceleur', 'gnome'],
    'f-terre':         ['nilfgaard', 'temeria', 'redania', 'kaedwen', 'aedirn', 'skellige', 'kaer-morhen', 'cintra' ],
    'f-statut':        ['noble', 'marchand', 'paysan', 'hors-la-loi', 'mercenaire', 'mage-cour', 'clerc'],
    'f-profession':    ['sorceleur', 'barde', 'medecin', 'mage', 'marchand', 'criminel', 'pretre', 'soldat'],
    'f-comp-exclu':    ['connaissance-monstres', 'alchimie', 'incantation', 'escrime', 'survie','medecine','bagarre','persuasion','seduction','artisanat'],

};

function genererStats(stats, conteneurId) {
    const conteneur = document.getElementById(conteneurId);

    stats.forEach(stat => {
        const ligne = document.createElement('div');
        ligne.className = 'stat-row';
        ligne.innerHTML = ` 
            <span class="stat-name">${stat.nom}</span>
            <input
                class="stat-input"
                type="number"
                id="${stat.id}"
                name="${stat.id.replace('s-', '')}"
                min="${stat.min}"
                ${stat.max ? `max="${stat.max}"` : ''}
                value="${stat.defaut}"
                />  
        `;
        conteneur.appendChild(ligne);
    });
}

/* compétences */

function genererCompetences() {
    const grille = document.getElementById('grille-competences');

    const colonnes = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
    ];

    colonnes[0].className = 'bloc-colonne';
    colonnes[1].className = 'bloc-colonne';
    colonnes[2].className = 'bloc-colonne';

    competences.forEach(categorie => {
        const bloc = document.createElement('div');
        bloc.className = 'bloc-competence';

        const title = document.createElement('div');
        title.className = 'bloc-competence-title';
        title.textContent = categorie.categorie;
        bloc.appendChild(title);

        categorie.items.forEach(item => {
            const ligne = document.createElement('div');
            ligne.className = 'competence-row';
            ligne.innerHTML = `
                <span class="competence-name">${item.nom}</span>
                <input
                    class="competence-input"
                    type="number"
                    id="c-${item.name}"
                    name="${item.name}"
                    min="0"
                    value="0"
                />
            `;
            bloc.appendChild(ligne);
        });
        colonnes[categorie.colonne].appendChild(bloc);
    });
    colonnes.forEach(col => grille.appendChild(col));
}

function genererArmure() {
    const tbody = document.getElementById('tbody-armure');

    localisationsArmure.forEach(localisation => {
        const name = localisation.toLowerCase().replace(/ /g, '-');
        const ligne = document.createElement('tr');
        ligne.innerHTML = `
        <td>${localisation}</td>
            <td><input class="td-input" type="number" name="armure-${name}-pa" min="0" value="0" /></td>
            <td><input class="td-input" type="number" name="armure-${name}-degats" min="0" value="0" /></td
        `;
        tbody.appendChild(ligne);
    });
};

function initChampsAvecAutre() {
    champsAvecAutre.forEach(champ => {
        const select = document.getElementById(champ.selectId);
        const autre = document.getElementById(champ.autreId);

        select.addEventListener('change', () => {
            if (select.value === 'autre') {
                autre.style.display = 'block';
                autre.focus();
            } else {
                autre.style.display = 'none';
                autre.value = '';
            }
        });
    });
}

function getValeurChamp(selectId, autreId) {
    const select = document.getElementById(selectId);
    const autre = document.getElementById(autreId);
    return select.value === 'autre' ? autre.value : select.value;
}

function  setValeurChamp(selectId, autreId, valeur) {
    const select = document.getElementById(selectId);
    const autre = document.getElementById(autreId);

    if (!valeur) return;

    if (valeursConnues[selectId].includes(valeur)) {
        select.value = valeur;
    } else {
        select.value = 'autre'; 
        autre.style.display = 'block';
        autre.value = valeur;
    }
}

async function chargerProfil() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/connexion.html';
        return;
    }
    try {
        const reponse = await fetch('/api/profil', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        
        if (!reponse.ok) {
            localStorage.removeItem('token');
            window.location.href = '/connexion.html';
            return;
        }

        const data = await reponse.json();

        affichagePseudo.textContent = data.pseudo;
        afficherEmail.textContent = data.email;
        avatarInitiale.textContent = data.pseudo.charAt(0).toUpperCase();

        if (!data.aAcces) {
            document.getElementById('sans-acces').style.display = 'block';

        } else if (!data.fiche) {
            document.getElementById('sans-fiche').style.display = 'block';

            document.getElementById('btn-creer').addEventListener('click', () => {
                document.getElementById('sans-fiche').style.display = 'none';
                document.getElementById('avec-fiche').style.display = 'block';
                document.getElementById('section-fiche').style.display= 'flex';
                document.getElementById('btn-sauvegarder').addEventListener('click', sauvegarderFiche);
            });

        } else {
            document.getElementById('avec-fiche').style.display = 'block';
            document.getElementById('section-fiche').style.display = 'flex';
            remplirFiche(data.fiche);
            document.getElementById('btn-sauvegarder').addEventListener('click', sauvegarderFiche);
        }
    } catch (error) {
        console.error('Erreur chargement profil :', error);
    }
    
}

/* remplir la fiche */

function remplirFiche(fiche) {

    document.getElementById('f-name').value              = fiche.name           || '';
    document.getElementById('f-age').value               = fiche.age            || '';
    document.getElementById('f-particularite').value     = fiche.particularite  || '';
    document.getElementById('f-genre').value             = fiche.genre          || '';

    setValeurChamp('f-race',                  'f-race-autre',             fiche.race                || '');
    setValeurChamp('f-terre',                 'f-terre-autre',            fiche.terre               || '');
    setValeurChamp('f-statut',                'f-statut-autre',           fiche.statut              || '');
    setValeurChamp('f-profession',            'f-profession-autre',       fiche.profession          || '');
    setValeurChamp('f-comp-exclu',            'f-comp-exclu-autre',       fiche.competenceExclu     || '');

    [...statsCaracteristiques, ...statsDerivees].forEach(stat => {
        const cle = stat.id.replace('s-', '');
        document.getElementById(stat.id).value = fiche.stats?.[cle] ?? stat.defaut;
    });

    document.getElementById('f-reputation').value   = fiche.reputation   || 0;
    document.getElementById('f-progression').value  = fiche.progression  || 0;

    competences.forEach(categorie => {
        categorie.items.forEach(item => {
            const input = document.getElementById('c-' + item.name);
            if (input) input.value = fiche.competences?.[item.name]  || 0;
        });
    });

    document.querySelectorAll('.arme-input').forEach(input => {
        const cle = input.name.replace('arme-', '');
        input.value = fiche.armes?.[cle] || '';
    });

    document.querySelectorAll('.td-input').forEach(input => {
        input.value = fiche.armure?.[input.name] ?? 0;
    });

    document.getElementById('f-entrainement').value = fiche.entrainement  || '';
    document.getElementById('f-notes').value  = fiche.notes  || '';
    document.getElementById('f-aptitudes').value = fiche.aptitudes || "";
}

/* collecte des données */

function collecterFiche() {

    const stats = {};
    [...statsCaracteristiques, ...statsDerivees].forEach(stat => {
        const cle = stat.id.replace('s-', '');
        stats[cle] = parseInt(document.getElementById(stat.id).value) || stat.defaut;
    });

    const competencesData = {};
    competences.forEach(categorie => {
        categorie.items.forEach(item => {
            const input = document.getElementById('c-' + item.name); 
            if (input) competencesData[item.name] = parseInt(input.value) || 0;
        });
    });

    const armesData = {};
    document.querySelectorAll('.arme-input').forEach(input => {
        const cle = input.name.replace('arme-', '');
        armesData[cle] = input.value;
    });

    const armureData = {};
    document.querySelectorAll('.td-input').forEach(input => {
        armureData[input.name] = parseInt(input.value) || 0;
    });

    return {
        name:                document.getElementById('f-name').value,
        age:                 document.getElementById('f-age').value,
        particularite:       document.getElementById('f-particularite').value,
        genre:               document.getElementById('f-genre').value,
        race:            getValeurChamp('f-race',            'f-race-autre'),
        terre:           getValeurChamp('f-terre',            'f-terre-autre'),
        statut:          getValeurChamp('f-statut',           'f-statut-autre'),
        profession:      getValeurChamp('f-profession',       'f-profession-autre'),
        competenceExclu: getValeurChamp('f-comp-exclu',       'f-comp-exclu-autre'), 

        stats:         stats,
        competences:   competencesData,
        armes: armesData,
        armure: armureData,

        reputation:    parseInt(document.getElementById('f-reputation').value)   || 0,
        progression:   parseInt(document.getElementById('f-progression').value)  || 0,

        entrainement:  document.getElementById('f-entrainement').value,
        notes:         document.getElementById('f-notes').value,
        aptitudes:     document.getElementById('f-aptitudes').value,
    };
}

/* Sauvegarde */

async function sauvegarderFiche() {

    const token = localStorage.getItem('token');
    const fiche = collecterFiche();

    try {
        const reponse = await fetch('/api/profil/fiche', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fiche)
        });
        if (reponse.ok) {
            alert('Fiche sauvegardée !');
        } else {
            alert('Erreur lors de la sauvegarde.');
        }
    } catch (error) {
        console.error('Erreur sauvegarde:', error);
        alert('Impossible de contacter le serveur.');
    }
}

/* deconnexion */

btnDeconnexion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/connexion.html'
});

/* initilisation */

genererStats(statsCaracteristiques,   'col-caracteristiques');
genererStats(statsDerivees,           'col-derivees');
genererCompetences();
genererArmure();
initChampsAvecAutre();
chargerProfil();