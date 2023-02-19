function connect(e) {
    e.preventDefault();

    // Requête permettant d'envoyer les valeurs du formulaire de connexion
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
            document.location.href="index.html";
            return res.json();
        } else {
            document
            .getElementById('error')
            .textContent = "E-mail ou mot de passe invalide";
        }
    })

    .then(value => {
        window.localStorage.setItem("userId", value.userId);
        window.localStorage.setItem("token", value.token);
    })  

    .catch(err => {
        console.log(err);
    })
};

document
.getElementById("form")
.addEventListener('submit', connect);