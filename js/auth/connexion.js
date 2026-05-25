const email = document.getElementById('email');
const password = document.getElementById('password');
const bannerError = document.getElementById('bannerError');

/*Fonction de Validation*/
function validerEmail() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    if (ok) {
        montrerValide(email, 'emailError');
        return true;
    }
    montrerErreur(email, 'emailError');
    return false;
}

function validerPassword() {
    const ok = /^.+$/.test(password.value);
    if (ok) {
        montrerValide(password, 'passwordError');
        return true;
    }
    montrerErreur(password, 'passwordError');
    return false;
}

email.addEventListener('input', validerEmail);
password.addEventListener('input', validerPassword);

/*Soumission avec fetch*/
/*mettre le fetch ici*/