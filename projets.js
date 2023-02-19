// Fiches projets

// Récupération des projets
const reponse = await fetch('http://localhost:5678/api/works');
export const works = await reponse.json();

// Création de la fonction permettant de générer les fiches projets
async function generateWorks(works) {
    // Création des fiches projets
    for (let workElement of works) {    
        const gallery = document.querySelector(".gallery");
        // Création d'une fiche projet, rattachée à la galerie
        const work = document.createElement("article");
        gallery.appendChild(work);
        // Création de l'image, rattachée à la fiche projet
        const imageWork = document.createElement("img");
        imageWork.src = workElement.imageUrl;
        work.appendChild(imageWork);
        // Création du titre, rattaché à la fiche projet
        const titleWork = document.createElement("h3");
        titleWork.innerText = workElement.title;
        work.appendChild(titleWork);
    }
}
// On appelle la fonction pour générer les fiches
generateWorks(works);



// Filtres

// Récupération des catégories
const reponseCat = await fetch('http://localhost:5678/api/categories');
const categories = await reponseCat.json();

// Création de la fonction permettant de générer des filtres fonctionnels
async function generateFilters(categories) {
    // Récupération des noms des catégories
    const categoriesNames = categories.map(categorie => categorie.name);
    // Vérification de l'unicité de chaque catégorie
    const categoriesSet = new Set();
    categoriesSet.add("Tous");
    for (let i in categoriesNames) {
        categoriesSet.add(categoriesNames[i])
    };
    // Création des boutons filtres
    const filters = document.getElementById("filters");
    for (let categorie of categoriesSet) {
        const filter = document.createElement("li");
        filters.appendChild(filter);
        const link = document.createElement("a");
        link.href="#portfolio";
        filter.appendChild(link);
        filter.classList.add("filter");
        link.classList.add("link");
        link.innerText = `${categorie}`;
    }

    // Initialisation du filtre "Tous"
    const filterAll = document.querySelector(".filter");
    filterAll.classList.add('filter-active');

    // Mise en place du filtrage
    const buttonFilter = document.querySelectorAll(".link");

    for (let filter of buttonFilter) {
        filter.addEventListener("click", function () {
            const filteredWorks = works.filter(function (work) {
                if (filter.innerText === "Tous") {
                    return works;
                } else {
                    return work.category.name === filter.innerText;
                }
            });
            document.querySelector('.filter-active').classList.remove('filter-active');
            filter.parentElement.classList.add('filter-active');
            document.querySelector(".gallery").innerHTML = '';
            generateWorks(filteredWorks);
        })
    }
}

generateFilters(categories);