// Importation des données des requêtes GET pour obtenir les projets et les catégories
import { worksData, categories } from './get.js';


// Fiches projets

// Création de la fonction permettant de générer les fiches projets
async function generateWorks(works) {
    // Galerie
    const gallery = document.querySelector(".gallery");
    if (works == null) {
        // Cas où il n'y aurait pas de projet
        const empty = document.createElement('span');
        empty.classList.add('empty');
        empty.innerText = 'Galerie vide';
        gallery.appendChild(empty);
    } else {
        // Création des fiches projets
        for (let workElement of works) {    
            // Création d'une fiche projet, rattachée à la galerie
            const work = document.createElement("figure");
            work.setAttribute('id', `work-${workElement.id}`);
            gallery.appendChild(work);
            // Création de l'image, rattachée à la fiche projet
            const imageWork = document.createElement("img");
            imageWork.src = workElement.imageUrl;
            work.appendChild(imageWork);
            // Création du titre, rattaché à la fiche projet
            const titleWork = document.createElement("figcaption");
            titleWork.innerText = workElement.title;
            work.appendChild(titleWork);
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
        filters.style.display = 'none';
    } else {
        // Vérification de l'unicité de chaque nom de catégorie
        const categoriesNames = new Set();
        // Création du filtre 'Tous'
        categoriesNames.add("Tous");
        for (let i in categories) {
            categoriesNames.add(categories[i].name)
        };
        // Création des boutons filtres
        for (let categorie of categoriesNames) {
            const filter = document.createElement("li");
            filters.appendChild(filter);
            const linkFilter = document.createElement("a");
            linkFilter.href="#portfolio";
            filter.appendChild(linkFilter);
            filter.classList.add("filter");
            linkFilter.classList.add("link-filter");
            linkFilter.innerText = `${categorie}`;
        }

        // Initialisation du filtre "Tous" comme onglet actif
        const filterAll = document.querySelector(".filter");
        filterAll.classList.add('filter-active');

        // Mise en place du filtrage lors du clic sur un onglet filtre
        const buttonFilter = document.querySelectorAll(".link-filter");

        for (let filter of buttonFilter) {
            filter.addEventListener("click", function () {
                const filteredWorks = worksData.filter(function (work) {
                    if (filter.innerText === "Tous") {
                        return worksData;
                    } else {
                        return work.category.name === filter.innerText;
                    }
                });
                // On affecte la classe donnant le style de l'onglet actif au filtre actuellement actif
                document.querySelector('.filter-active').classList.remove('filter-active');
                filter.parentElement.classList.add('filter-active');
                // On génère les projets filtrés après avoir effacé le contenu de la galerie précédente
                document.querySelector(".gallery").innerHTML = '';
                generateWorks(filteredWorks);
            })
        }
    }
    
}
// On appelle la fonction pour générer les fiches filtrées
generateFilters(categories);