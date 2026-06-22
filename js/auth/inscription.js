const pseudo = document.getElementById("pseudo");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("confirmPassword");
const succes = document.getElementById("succes");
const bannerError = document.getElementById("bannerError");

/*Fonction de Validation*/
function validerPseudo() {
    const ok = /^[a-zA-ZÀ-ÿ0-9_-]{3,20}$/.test(pseudo.value.trim());
    if (ok) {
        montrerValide(pseudo, 'pseudoError');
        return true;
    }
    montrerErreur(pseudo, 'pseudoError');
    return false;
}

function validerEmail() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (ok) {
        montrerValide(email, 'emailError');
        return true;
    }
    montrerErreur(email, 'emailError');
    return false;
}

function validerPassword() {
    const ok = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password.value);
    if (ok) {
        montrerValide(password, 'passwordError');
        return true;
    }
    montrerErreur(password, 'passwordError');
    return false;
}

function validerConfirm() {
    const ok = password.value === confirm.value && confirm.value !== '';
    if (ok) {
        montrerValide(confirm, 'confirmPasswordError');
        return true;
    }
    montrerErreur(confirm, 'confirmPasswordError');
    return false;
}

pseudo.addEventListener('input', validerPseudo);
email.addEventListener('input', validerEmail);
password.addEventListener('input', () => {
    validerPassword();
    if (confirm.value !== '') validerConfirm();
});
confirm.addEventListener('input', validerConfirm);

pseudo.addEventListener('focus', () => reinitialiser(pseudo, 'pseudoError'));
pseudo.addEventListener('focus', () => reinitialiser(email, 'emailError'));
pseudo.addEventListener('focus', () => reinitialiser(password, 'passwordError'));
confirm.addEventListener('focus', () => reinitialiser(confirm, 'confirmPasswordError'));

/*Soumission avec fetch*/
async function soumettreInscription(event) {
    event.preventDefault();

    const ok1 = validerPseudo();
    const ok2 = validerEmail();
    const ok3 = validerPassword();
    const ok4 = validerConfirm();

    if (ok1 && ok2 && ok3 && ok4) {
        try {
            const reponse = await fetch('/api/auth/inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pseudo: pseudo.value,
                    email: email.value,
                    password: password.value,
                })
            });

            const data = await reponse.json();

            if (reponse.ok) {
                succes.style.display = 'block';
                pseudo.value = '';
                email.value = '';
                password.value = '';
                confirm.value = '';

                setTimeout(() => {
                    window.location.href = '/connexion.html';
                }, 2000);
            } else {
                bannerError.style.display = 'block';
                bannerError.textContent = data.message;
            }
        } catch (error) {
            console.error('Erreur inscription:', error);
        }
    }
} 