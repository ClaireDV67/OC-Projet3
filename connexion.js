function connect(e) {
    e.preventDefault();

    // Requête permettant d'envoyer les valeurs du formulaire de connexion
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('mot-de-passe').value
        })
    })
    .then(res => {
        if (res.ok) {
            document.location.href="index.html";
            return res.json();
        } else {
            document
            .getElementById('erreur')
            .textContent = "E-mail ou mot de passe invalide";
        }
    })

    .then(value => {
        window.localStorage.setItem("userId", value.userId);
        window.localStorage.setItem("token", value.token);
    })  

    .catch(err => {
        console.log(err);
        document
            .getElementById('erreur')
            .textContent = "Erreur, veuillez réessayer ultérieurement";
    })
};

document
.getElementById("form")
.addEventListener('submit', connect);