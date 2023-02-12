// Récupération des données
fetch('http://localhost:5678/api/works')
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(projets) {
    // Création de la liste des catégories
    const catSet = new Set();
    const cat = projets.map(projet => projet.category.name);
    console.log(cat);
    for (let i in cat) {
        catSet.add(cat[i]);
    }
    console.log(catSet);
    const categories = Array.from(catSet);
    console.log(categories);

    // Création des filtres
    const filtres = document.querySelector(".filtres");
    const filtreTous = document.createElement("li");
    filtreTous.classList.add("filtre", "filtre-actif");
    filtreTous.innerHTML = "<a href='#' class='lien-tous'>Tous</a>";
    filtres.appendChild(filtreTous);
    for (let i of categories) {
        const filtre = document.createElement("li");
        filtres.appendChild(filtre);
        const lien = document.createElement("a");
        lien.href="#";
        filtre.appendChild(lien);
        filtre.classList.add("filtre");
        lien.classList.add("lien");
        lien.innerText = `${i}`;
    }

    // Création des fiches travaux
    const gallery = document.querySelector(".gallery");
    function genererProjets(projets) {
        for (let projet of projets) {        
            const figure = document.createElement("figure");
            gallery.appendChild(figure);
            const imageProjet = document.createElement("img");
            imageProjet.src = projet.imageUrl;
            const titreProjet = document.createElement("figcaption");
            titreProjet.innerText = projet.title;
            figure.appendChild(imageProjet);
            figure.appendChild(titreProjet);
        }
        console.log(projets);
    }

    genererProjets(projets);

    // Filtrage au clic
    const boutonFiltrer = document.querySelectorAll(".lien");
    console.log(boutonFiltrer);
    for (let filtre of boutonFiltrer) {
        filtre.addEventListener("click", function () {
            const projetsFiltres = projets.filter(function (projet) {
                return projet.category.name == filtre.innerText;
            });
            console.log(projetsFiltres);
            document.querySelector('.filtre-actif').classList.remove('filtre-actif');
            filtre.parentElement.classList.add('filtre-actif');
            document.querySelector(".gallery").innerHTML = '';
            genererProjets(projetsFiltres);
        })
    }
    const boutonFiltrerTous = document.querySelector(".lien-tous");
    boutonFiltrerTous.addEventListener("click", function () {
        document.querySelector('.filtre-actif').classList.remove('filtre-actif');
        boutonFiltrerTous.parentElement.classList.add('filtre-actif');
        document.querySelector(".gallery").innerHTML = '';
        genererProjets(projets);
    })
    
})
.catch(function(err) {
    console.log(err);
});







