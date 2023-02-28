// Importation des données des requêtes GET pour obtenir les projets et les catégories
import { worksData, categories } from "./data.js";
import { generateOneWork } from "./generateOneWork.js";

// Galerie
const gallery = document.querySelector(".gallery");

// Si aucune donnée
const empty = document.createElement("span");
empty.classList.add("empty");

// Fiches projets

// Création de la fonction permettant de générer les fiches projets
export async function generateWorks(works) {
	if (works == null || works == [] || works.length == 0) {
		// Cas où il n'y aurait pas de projet
		empty.innerText = "Galerie vide";
		gallery.appendChild(empty);
	} else {
		// Création des fiches projets
		for (let workElement of works) {
			generateOneWork(workElement);
		}
	}
		
}
// On appelle la fonction pour générer les fiches
generateWorks(worksData);


// Filtres

// Création de la fonction permettant de générer des filtres fonctionnels
async function generateFilters(categories) {
	const filters = document.getElementById("filters");
	if (categories == null) {
		filters.style.display = "none";
	} else {
		// Vérification de l'unicité de chaque nom de catégorie
		const categoriesSet = new Set();
		// Création du filtre 'Tous'
		categoriesSet.add({id: 0, name: "Tous"});
		for (let i in categories) {
			categoriesSet.add(categories[i]);
		}
		// Création des boutons filtres
		for (let categorie of categoriesSet) {
			const filter = document.createElement("li");
			filters.appendChild(filter);
			const linkFilter = document.createElement("a");
			linkFilter.href="#portfolio";
			filter.appendChild(linkFilter);
			filter.classList.add("filter");
			if (categorie.id == 0) {
				filter.classList.add("filter-active");
			};
			linkFilter.classList.add("link-filter");
			linkFilter.innerText = `${categorie.name}`;
			linkFilter.dataset.categoryId = `${categorie.id}`;
			linkFilter.addEventListener("click", function () {
				const filteredWorks = worksData.filter(function (work) {
					if (linkFilter.dataset.categoryId == 0) {
						return worksData;
					} else {
						return work.categoryId == linkFilter.dataset.categoryId;
					}
				});
				// On affecte la classe donnant le style de l'onglet actif au filtre actuellement actif
				document.querySelector(".filter-active").classList.remove("filter-active");
				linkFilter.parentElement.classList.add("filter-active");
				// On génère les projets filtrés après avoir effacé le contenu de la galerie précédente
				gallery.innerHTML = "";
				generateWorks(filteredWorks);
			});
		}
	}		
}
// On appelle la fonction pour générer les fiches filtrées
generateFilters(categories);