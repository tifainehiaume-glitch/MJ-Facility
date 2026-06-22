/*Fonctions partagées avec connexion et inscription*/

/*affiche une erreur sous un champ*/
function montrerErreur(input, erreurId) {
    input.classList.remove('valide');
    input.classList.add('erreur-champ');
    document.getElementById(erreurId).style.display = 'block';
}

/*affiche la validation d'un champ*/
function montrerValide(input, erreurId) {
    input.classList.remove('erreur-champ');
    input.classList.add('valide');
    document.getElementById(erreurId).style.display = 'none';
}

/*reset les champs et les erreurs*/
function reinitialiser(input, erreurId) {
    input.classList.remove('valide', 'erreur-champ');
    document.getElementById(erreurId).style.display = 'none';
}