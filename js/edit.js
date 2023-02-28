import { worksData, categories } from "./data.js";
import { generateWorks } from "./works.js";

// Stockage du token dans une constante
export const token = window.sessionStorage.getItem("token");

// Si présence du token dans sessionStorage, poursuite en mode édition
if (token !== null) {

	// Ajout de la bannière de la page édition
	const banner = document.createElement("div");
	const body = document.querySelector("body");
	const header = document.querySelector("header");
	body.insertBefore(banner, header);
	banner.classList.add("banner");
	header.classList.add("header-administrator");
	banner.innerHTML = 
		"<span class='banner-element'><i class='fa-regular fa-pen-to-square fa-xl'></i>Mode édition</span>"
		+ "<a href='#' class='banner-element banner-button'>publier les changements</a>";
		

	// Ajout des boutons "Modifier"
	// Bouton "Modifier" situé sous l'image de la section introduction de la page édition
	const editButtonIntroduction = document.createElement("a");
	const introduction = document.getElementById("image-introduction");
	introduction.appendChild(editButtonIntroduction);
	editButtonIntroduction.href = "#";
	editButtonIntroduction.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
	editButtonIntroduction.setAttribute("id", "button-introduction");

	// Bouton "Modifier" situé au dessus de l'article de la section introduction de la page édition
	const editButtonArticle = document.createElement("a");
	const introductionArticle = document.getElementById("introduction-article");
	const articleTitle = document.getElementById("intro-article-title");
	introductionArticle.insertBefore(editButtonArticle, articleTitle);
	editButtonArticle.href = "#";
	editButtonArticle.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
	editButtonArticle.setAttribute("id", "button-article");

	// Bouton "Modifier" ouvrant la modale, situé à côté du titre de la section portfolio de la page édition
	const editButtonPortfolio = document.createElement("a");
	const works = document.getElementById("works");
	works.appendChild(editButtonPortfolio);
	editButtonPortfolio.href = "#modal";
	editButtonPortfolio.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
	editButtonPortfolio.setAttribute("id", "button-portfolio");


	// Modification du menu avec logout
	const menu = document.getElementById("menu");
	const menuLogin = document.getElementById("menu-login");
	const menuLogout = document.createElement("li");
	menuLogout.innerHTML = "<a href='#'>logout</a>";
	menu.replaceChild(menuLogout, menuLogin);
	function logout(e) {
		e.preventDefault();
		window.sessionStorage.removeItem("userId");
		window.sessionStorage.removeItem("token");
		location.reload();
	}
	menuLogout.addEventListener("click", logout);


	// Disparition des filtres
	const filters = document.getElementById("filters");
	filters.style.display = "none";


	// Création de la modale
	const modal = document.createElement("aside");
	document.querySelector("main").appendChild(modal);
	modal.setAttribute("aria-hidden", "true");
	modal.setAttribute("role", "dialog");
	modal.setAttribute("aria-labelledby", "title-modal");
	modal.setAttribute("style", "display: none");
	modal.classList.add("modal");
	modal.innerHTML = 
		"<div class='modal-wrapper'>"
			+ "<div id='modal-icon'></div>"
			+ "<h4 id='title-modal'></h4>"
			+ "<div id='modal-content'></div>"
			+ "<div class='button-container'></div>"
		+ "</div>";

	// Galerie principale
	const gallery = document.querySelector(".gallery");
	// Conteneur de la modale
	const modalWrapper = document.querySelector(".modal-wrapper");
	// Titre de la page de la modale
	const titleModal = document.getElementById("title-modal");
	// Conteneur de la partie principale de la modale
	const contentModal = document.getElementById("modal-content");
	// Conteneur des boutons de la modale
	const buttonModal = document.querySelector(".button-container");
	// Bouton "Ajouter une photo", de la première page de la modale
	const buttonAdd = document.createElement("a");
	buttonAdd.href = "#";
	buttonAdd.classList.add("button-add", "button-modal");
	buttonAdd.innerText = "Ajouter une photo";
	// Bouton "Supprimer la galerie", de la première page de la modale
	const buttonDelete = document.createElement("a");
	buttonDelete.href = "#";
	buttonDelete.classList.add("button-delete", "button-modal");
	buttonDelete.innerText = "Supprimer la galerie";
	// Bouton "Valider", de la seconde page de la modale
	const buttonValidate = document.createElement("input");
	// Conteneur des icônes de la modale
	const iconModal = document.getElementById("modal-icon");
	// Bouton "croix" de la modale, permettant de la fermer
	const iconClose = document.createElement("a");
	iconClose.href = "#";
	iconClose.classList.add("modal-close");
	iconClose.innerHTML = "<i class='fa-solid fa-xmark fa-xl'></i>";
	iconModal.appendChild(iconClose);
	// Bouton "flèche" de la seconde page de la modale, permettant de revenir à la première page
	const iconBack = document.createElement("a");
	iconBack.href = "#";
	iconBack.innerHTML = "<i class='fa-solid fa-arrow-left fa-xl'></i>";
	// Icône "quatre flèches" présente sur l'image du premier projet de la galerie de la modale
	const iconFirst = document.createElement("button");
	iconFirst.innerHTML = "<i class='fa-solid fa-arrows-up-down-left-right fa-xs icon-modal'></i>";
	// Message d'erreur
	const error = document.createElement("span");
		
	// Fonction permettant la suppression des fiches projets
	function deleteWorks(e, id, indexWork) {
		e.preventDefault();
		fetch(`http://localhost:5678/api/works/${id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
			.then(res => {
				if (res.ok) {
					// Suppresion du projet des galeries de la page et de la modale
					worksData.splice(indexWork, 1);
					gallery.innerHTML = "";
					contentModal.innerHTML = "";
					generateWorks(worksData);
					generateWorksModal(worksData);
				}
			})
			.catch(err => {
				console.log(err);
			});
	}
		
	// Fonction permettant de générer les fiches projets dans la modale
	async function generateWorksModal(worksData) {
		// Création des fiches projets de la modale
		for (let workElement of worksData) {	
			// Création d'une fiche projet, rattachée à la galerie de la modale
			const work = document.createElement("figure");
			work.classList.add("modal-work");
			contentModal.appendChild(work);
			// Ajout de l'image, rattachée à la fiche projet
			const imageWork = document.createElement("img");
			imageWork.src = workElement.imageUrl;
			work.appendChild(imageWork);
			// Ajout du lien "éditer", rattaché à chaque fiche projet
			const titleWork = document.createElement("a");
			titleWork.href = "#";
			titleWork.innerText = "éditer";
			work.appendChild(titleWork);
			// Création du conteneur des icônes présentes sur l'image de la fiche projet
			const icon = document.createElement("span");
			icon.classList.add("icon-modal-container");
			// Ajout de l'icône "poubelle" pour chaque fiche projet
			icon.innerHTML = `<button class="button-trash"><i class="fa-solid fa-trash-can icon-modal fa-xs"></i></button>`;
			work.appendChild(icon);
			// Ajout de l'icône "4 flèches" à gauche de l"icône "poubelle" sur la première fiche projet
			const iconTrash = icon.querySelector(".button-trash");
			if (work == contentModal.firstElementChild) {
				icon.insertBefore(iconFirst, iconTrash);
			}
			// On récupère l'index de la fiche projet
			const indexWork = worksData.indexOf(workElement);
			// Appel à la fonction permettant la suppression d'un projet lors du clic sur son icône "poubelle"
			iconTrash.addEventListener("click", (e) => deleteWorks(e, workElement.id, indexWork));
		}
	}

	// Déclaration des éléments focusables
	const focusableSelector = "button, a, input, input[type='submit'], input[type='button'], input[type='text'], select, textarea";
	let focusables = [];
	let previouslyFocusedElement = null;

	// Ouverture de la première page de la modale
	function openModal(e) {
		e.preventDefault();
		// Ouverture de la modale
		modal.style.display = null;
		modal.removeAttribute("aria-hidden");
		modal.setAttribute("aria-modal", "true");
		// Fermeture de la modale lors du clic sur la page
		modal.addEventListener("click", closeModal);
		// Fermeture de la modale au clic sur l'icône "croix"
		iconClose.addEventListener("click", closeModal);
		// Empêcher la fermeture de la modale lors du clic sur la modale
		modalWrapper.addEventListener("click", stopPropagation);
		// Ajout/Modification du titre lors de l'ouverture de la première page de la modale
		titleModal.innerText = "Galerie photo";
		// Suppression des boutons lors du changement de page de la modale (remise à zéro du conteneur boutons)
		while ( buttonModal.firstChild ) {
			buttonModal.removeChild( buttonModal.firstChild);
		}
		// Suppression des icônes lors du changement de page de la modale (remise à zéro du conteneur icônes)
		while ( iconModal.firstChild ) {
			iconModal.removeChild( iconModal.firstChild);
		}
		// Ajout de l'icône "croix" de la première page de la modale
		iconModal.appendChild(iconClose);
		// Ajout du bouton "Ajouter une photo" de la première page de la modale, menant à la seconde page
		buttonModal.appendChild(buttonAdd);
		// Ajout du bouton "Supprimer la galerie" de la première page de la modale
		buttonModal.appendChild(buttonDelete);
		// Suppression du contenu principal de la première page de la modale (remise à zéro)
		contentModal.innerHTML = "";
		// Changement de classe pour le style display
		contentModal.classList.remove("modal2");
		contentModal.classList.add("modal1");
		// Ajout/Rechargement des fiches projets de la galerie
		generateWorksModal(worksData);
		// Ajout des éléments focusables présents sur la page dans le tableau
		focusables = Array.from(modal.querySelectorAll(focusableSelector));
		previouslyFocusedElement = document.querySelector(":focus");
	}

	// Fermeture de la modale
	function closeModal(e) {
		if (modal === null) return;
		// Retrait du focus sur un élément de la modale
		if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
		e.preventDefault();
		// Ajout d'un délai de 300ms pour pouvoir animer la fermeture
		window.setTimeout(function () {
			modal.style.display = "none";
			modal = null;
		}, 300);		
		// Fermeture de la modale
		modal.setAttribute("aria-hidden", "true");
		modal.removeAttribute("aria-modal");
		modal.removeEventListener("click", closeModal);
	}

	// Empêcher la propagation de la fermeture de la modale au clic sur la modale
	function stopPropagation(e) {
		e.stopPropagation();
	}

	// Donner un comportement normal au focus de la modale et rendre les liens sous la modale infocusable
	function focusInModal(e) {
		e.preventDefault();
		let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
		if (e.shiftKey === true) {
			index--;
		} else {
			index++;
		}
		if (index >= focusables.length) {
			index = 0;
		}
		if (index <0) {
			index = focusables.length - 1;
		}
		focusables[index].focus();
	}

	// Evénement permettant l'ouverture de la modale
	editButtonPortfolio.addEventListener("click", openModal);

	// Ajout de la possibilité de focus avec tab et de fermer avec échap
	window.addEventListener("keydown", function(e) {
		if (e.key === "Escape" || e.key === "Esc") {
			closeModal(e);
		}
		if (e.key === "Tab" && modal !== null) {
			focusInModal(e);
		}
	});

	// Vérification de l'unicité de chaque catégorie pour les options du select du formulaire (mises dans un tableau)
	const categoriesSet = new Set();
	for (let i in categories) {
		categoriesSet.add(categories[i]);
	}
	const categoriesWorks = Array.from(categoriesSet);

	// Fonction permettant d'aller sur la deuxième page de la modale
	function changeModal(e) {
		e.preventDefault();
		// Ajout du titre de la seconde page de la modale
		titleModal.innerHTML = "Ajout Photo";
		// Ajout de l'icône "flèche" permettant de revenir à la première page de la modale
		iconModal.appendChild(iconBack);
		// Changement de classe pour le style display
		contentModal.classList.remove("modal1");
		contentModal.classList.add("modal2");
		// Ajout du formulaire dans le contenu principal de la modale
		contentModal.innerHTML = 
			"<form 	class='form-element form-modal'>"
				+ "<div class='preview-container'>"
					+ "<img id='preview-picture' style='display: none' src='#' alt='Aperçu image'>"
					+ "<div class='input-modal add-picture-container'>"
						+ "<i class='fa-regular fa-image fa-5x'></i>"
						+ "<input type='file' name='image' accept='.png, .jpeg, .jpg' id='button-add-picture-input'>"
						+ "<label id='button-add-picture' for='button-add-picture-input'>+ Ajouter photo</label>"
						+ "<span class='txt-add-picture'>jpg, png : 4mo max</span>"
					+ "</div>"
				+ "</div>"
				+ "<label class='label' for='title-modal-add'>Titre</label>"
				+ "<input class='text-zone input-modal' id='title-modal-add' type='text' name='title' minlength='3' maxlength='50' required>"
				+ "<label class='label' id='label-category' for='category-modal'>Catégorie</label>"
				+ "<div id='select'>"
					+ "<select class='text-zone input-modal' id='category-modal' name='category' required>"
						+ "<option value='' selected disabled></option>" 
					+ "</select>"
					+ "<i class='fa-solid fa-angle-down fa-lg'></i>"
				+ "</div>"
			+ "</form>";
		// Formulaire
		const formModal = document.querySelector(".form-modal");
		// Bouton permettant de choisir une image
		const inputButtonAddPicture = document.getElementById("button-add-picture-input");
		// Ajout de la possibilité de voir un aperçu de l'image choisie dans le input file
		const previewPicture = document.getElementById("preview-picture");
		const addPictureContainer = document.querySelector(".add-picture-container");
		inputButtonAddPicture.addEventListener("change", () => {
			const [file] = inputButtonAddPicture.files;
			if (file) {
				previewPicture.src = URL.createObjectURL(file);
				addPictureContainer.style.display = "none";
				previewPicture.style.display = null;
			}
		});
		// Suppression des boutons du conteneur boutons de la modale
		while ( buttonModal.firstChild ) {
			buttonModal.removeChild( buttonModal.firstChild);
		}
		// Ajout du bouton "Valider" à la seconde page de la modale, désactivé à l'ouverture de la page
		buttonValidate.setAttribute("type", "button");
		buttonValidate.setAttribute("value", "Valider");
		buttonValidate.setAttribute("disabled", "");
		buttonValidate.classList.add("button-modal", "button-add-work");
		buttonModal.appendChild(buttonValidate);
		// Input text du formulaire renseignant le titre du projet à ajouter
		const titleAddInput = document.getElementById("title-modal-add");
		// Select du formulaire renseignant la catégorie du projet à ajouter
		const categoriesModalInput = document.getElementById("category-modal");
		// Ajout des catégories aux options du select du formulaire
		for (let categorie of categoriesWorks) {
			const optionCategoriesModal = document.createElement("option");
			optionCategoriesModal.setAttribute("value", `${categorie.id}`);
			categoriesModalInput.appendChild(optionCategoriesModal);
			optionCategoriesModal.innerText = `${categorie.name}`;
		}

		// Fonction permettant de poster un projet
		function postWork(e) {
			e.preventDefault();
			var formData = new FormData();
			formData.append("image", inputButtonAddPicture.files[0], inputButtonAddPicture.files[0].name);
			formData.append("title", titleAddInput.value);
			formData.append("category", categoriesModalInput.value);
			// Envoi de la requête
			fetch("http://localhost:5678/api/works", {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`
				},
				body: formData
			})
				.then(res => {
					if (res.ok) {
						// Message informant l'utilisateur de l'envoi de son projet, directement dans le bouton
						buttonValidate.setAttribute("value", "Envoyé !");
						buttonValidate.setAttribute("disabled", "");
						// On supprime l'évènement au cas où l'utilisateur ferait un nouvel ajout sans recharger la page
						buttonValidate.removeEventListener("click", postWork);
						return res.json();
					} else {
						// Message d'erreur
						error.innerText = "Une erreur est survenue, veuillez réessayer ultérieurement";
						error.classList("error");
						buttonModal.appendChild(error);
					}
				})
			
				.then(value => {
					// Ajout du projet à worksData
					worksData.push(value);

					// Ajout du projet à la galerie principale
					gallery.innerHTML = "";
					generateWorks(worksData);
				})

				.catch(err => {
					// Message d'erreur
					error.innerText = "Une erreur est survenue, veuillez réessayer ultérieurement";
					error.classList("error");
					buttonModal.appendChild(error);
					console.log(err);
				});
		}

		// Au cas où l'utilisateur aurait rempli le formulaire sans le valider avant de fermer et reviendrait valider un nouveau formulaire
		// Pour éviter la duplication des événements qui enverraient plusieurs requêtes POST
		iconClose.addEventListener("click", () => {
			buttonValidate.removeEventListener("click", postWork);
		});
		
		// Validation de l'input "Titre"
		function isValid(value) {
			return /^[A-Z]/.test(value) && !/[^a-zA-Z\ ]/.test(value) && value.length > 2 && value.length < 50;
		}
		
		// Fonction réactivant le bouton "Valider" si le formulaire est entièrement rempli
		function isComplete() {
			if (inputButtonAddPicture.value != "" && titleAddInput.value != "" && isValid(titleAddInput.value) && categoriesModalInput.value != "") {
				buttonValidate.removeAttribute("disabled");
				// Appel à la fonction permettant de poster un projet lors du clic sur le bouton "Valider"
				buttonValidate.addEventListener("click", postWork);
			} else {
				buttonValidate.setAttribute("disabled", "");
				// On supprime l'évènement au cas où l'utilisateur fermerait la modale ou reviendrait en arrière sans recharger la page
				buttonValidate.removeEventListener("click", postWork);
			}
		}
		// Appel à la fonction isComplete lors de la détection d'un changement dans l'input type file
		// Et vérification du type de fichier
		inputButtonAddPicture.addEventListener("change", () => {
			if (inputButtonAddPicture.files[0].type != "image/jpg" && inputButtonAddPicture.files[0].type != "image/jpeg" && inputButtonAddPicture.files[0].type != "image/png") {
				const previewContainer = document.querySelector(".preview-container");
				const errorTypeFile = document.createElement("span");
				errorTypeFile.innerText = "Type de fichier invalide";
				errorTypeFile.classList.add("error");
				formModal.insertBefore(errorTypeFile, previewContainer.nextElementSibling);
			}
			isComplete();
		});
		// Appel à la fonction isComplete lors de la détection d'un changement dans l'input text
		titleAddInput.addEventListener("change", () => {
			if (formModal.querySelector(".error") != undefined) {
				formModal.removeChild(formModal.querySelector(".error"));
			}
			if (isValid(titleAddInput.value) === false) {
				buttonValidate.setAttribute("disabled", "");
				error.classList.add("error");
				const labelCategory = document.getElementById("label-category");
				formModal.insertBefore(error, labelCategory);
				error.innerText = "Le titre doit commencer par une majuscule, ne contenir que des lettres, et comporter de 3 à 50 caractères";
			} else {
				isComplete();
			}
		});
		// Appel à la fonction isComplete lors de la détection d'un changement dans le select
		categoriesModalInput.addEventListener("change", isComplete);
		// Appel à la fonction retour à la première page de la modale lors du clic sur l'icône "croix"
		iconBack.addEventListener("click", (e) => {
			// On supprime l'écouteur d'événement au cas où l'utilisateur aurait rempli le formulaire sans le valider
			buttonValidate.removeEventListener("click", postWork);
			openModal(e);
		});
		// Ajout des éléments focusables présents sur la page dans le tableau
		focusables = Array.from(modal.querySelectorAll(focusableSelector));
		previouslyFocusedElement = document.querySelector(":focus");
	}
		
	// Passage à la seconde page de la modale lors du clic sur le bouton "Ajouter une photo" de la première page
	buttonAdd.addEventListener("click", changeModal);
}