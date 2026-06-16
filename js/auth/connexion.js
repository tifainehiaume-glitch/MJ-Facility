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

/* fetch */

async function soumettreLogin(event) {
    event.preventDefault();

    const ok1 = validerEmail();
    const ok2 = validerPassword();

    if (ok1 && ok2) {
        try {
            const reponse = await fetch('/api/auth/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            });

            const data = await reponse.json();

            if (reponse.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/profil.html';
            } else {
                bannerError.style.display = 'block';
                bannerError.textContent = data.message;
            }
        } catch (error) {
            console.error('Erreur connexion:', error)
        } 
    }
}