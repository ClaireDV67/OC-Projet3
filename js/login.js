// Fonction permettant de se connecter pour éditer la galerie du site
function login () {
	document
		.getElementById("error-login")
		.textContent = "";
	// Requête envoyant les valeurs du formulaire de connexion
	fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email: document.getElementById("email").value,
			password: document.getElementById("password").value
		})
	})
		
		.then(res => {
			if (res.ok) {
				return res.json();
			} if (res.status == 404 || res.status == 401) {
				console.log(res.status);
				// Message d"erreur
				document
					.getElementById("error-login")
					.textContent = "Erreur dans l’identifiant ou le mot de passe";
			} else {
				console.log(res.status);
				document
					.getElementById("error-login")
					.textContent = "Une erreur est survenue, veuillez réessayer ultérieurement";
			}
		})

		.then(value => {
			// Mémorisation du token dans le sessionStorage
			window.sessionStorage.setItem("token", value.token);
			// Redirection vers la page d"accueil, en mode édition grâce au token qui sera récupéré
			document.location.href="index.html";
		})  

		.catch(err => {
			console.log(err);
		});
}

// Validation du mail
function isValid(value) {
	return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

// Appel à la fonction login lors de la soumission du formulaire
document
	.getElementById("form")
	.addEventListener("submit", (e) => {
		e.preventDefault();
		document
			.getElementById("error-email")
			.innerText = "";
		if (isValid(document.getElementById("email").value)) {
			login();
		} else {
			document
				.getElementById("error-email")
				.innerText = "Format invalide";
		}
	});