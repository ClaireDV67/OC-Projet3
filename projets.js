fetch('http://localhost:5678/api/works')
.then(function(res) {
    if (res.ok) {
    return res.json();
    }
})
.then(function(value) {
    const categories = value.map(categorie => categorie.category.name);
    console.log(categories);
    const boutonFiltrer = document.createElement("btn-filtrer");
    boutonFiltrer.addEventListener("click", function () {
            // ...
        });
    const gallery = document.querySelector(".gallery");
    for (let projet of value) {
        const figure = document.createElement("figure");
        gallery.appendChild(figure);
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const titreProjet = document.createElement("figcaption");
        titreProjet.innerText = projet.title;
        figure.appendChild(imageProjet);
        figure.appendChild(titreProjet);
    }
})
.catch(function(err) {
    console.log(err);
});







