// Fonction permettant de se connecter pour éditer la galerie du site
function login(e) {
    e.preventDefault();

    // Requête envoyant les valeurs du formulaire de connexion
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            // Message d'erreur
            document
            .getElementById('error-login')
            .textContent = "E-mail ou mot de passe invalide";
        }
    })

    .then(value => {
        // Mémorisation du token dans le sessionStorage
        window.sessionStorage.setItem("token", value.token);
        // Redirection vers la page d'accueil, en mode édition grâce au token qui sera récupéré
        document.location.href="index.html";
    })  

    .catch(err => {
        console.log(err);
    })
};

// Appel à la fonction login lors de la soumission du formulaire
document
.getElementById("form")
.addEventListener('submit', login);