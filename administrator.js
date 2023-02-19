if (window.localStorage.getItem("token") != null) {
    // Ajout de la bannière
    const body = document.querySelector('body');
    const banner = document.createElement('div');
    const header = document.querySelector('header');
    body.insertBefore(banner, header);
    banner.classList.add("banner");
    header.classList.add("header-administrator");
    banner.innerHTML = "<span class='banner-element'><i class='fa-regular fa-pen-to-square fa-xl'></i>Mode édition</span><a href='#' class='banner-element banner-button'>publier les changements</a>";

    // Ajout des boutons "modifier"
    const introduction = document.getElementById('image-introduction');
    const buttonIntroduction = document.createElement('a');
    introduction.appendChild(buttonIntroduction);
    buttonIntroduction.href = '#';
    buttonIntroduction.classList.add('button-edit');
    buttonIntroduction.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
    buttonIntroduction.setAttribute('id', 'button-introduction');

    const buttonPortfolio = document.createElement('a');
    const works = document.getElementById('works');
    works.appendChild(buttonPortfolio);
    buttonPortfolio.href = '#modal1';
    buttonPortfolio.classList.add('button-edit');
    buttonPortfolio.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
    buttonPortfolio.setAttribute('id', 'button-portfolio');

    // Modification du menu avec logout
    const menu = document.getElementById('menu');
    const menuLogin = document.getElementById('menu-login');
    const menuLogout = document.createElement('li');
    menuLogout.setAttribute('id', 'menu-logout');
    menuLogout.innerHTML = "<a href='#''>logout</a>";
    menu.replaceChild(menuLogout, menuLogin);

    // Suppression des filtres
    const portfolio = document.getElementById('portfolio');
    const filters = document.getElementById('filters');
    portfolio.removeChild(filters);

    // Création de la modale
    let modal = null;
    const focusableSelector = "button, a, input, textarea";
    let focusables = [];
    let previouslyFocusedElement = null;
    // Ouverture de la modale
    function openModal(e) {
        e.preventDefault();
        const modal1 = document.getElementById('modal1');
        focusables = Array.from(modal1.querySelectorAll(focusableSelector));
        previouslyFocusedElement = document.querySelector(':focus');
        modal1.style.display = null;
        modal1.removeAttribute('aria-hidden');
        modal1.setAttribute('aria-modal', 'true');
        modal = modal1;
        modal.addEventListener('click', closeModal);
        const buttonCloseModal = document.querySelector('.modal-close');
        buttonCloseModal.addEventListener('click', closeModal);
        const modalWrapper = document.querySelector('.modal-wrapper');
        modalWrapper.addEventListener('click', stopPropagation);
    };
    // Fermeture de la modale
    function closeModal(e) {
        if (modal === null) return
        if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
        e.preventDefault();
        window.setTimeout(function () {
            modal.style.display = 'none';
            modal = null;
        }, 300);        
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
        modal.removeEventListener('click', closeModal);
    };
    // Empêcher la propagation de la fermeture de la modale au clic sur la modale
    function stopPropagation(e) {
        e.stopPropagation()
    };
    // Donner un comportement normal au focus de la modale et rendre les liens sous la modale infocusable
    function focusInModal(e) {
        e.preventDefault();
        let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
        if (e.shiftKey === true) {
            index--
        } else {
            index++
        }
        if (index >= focusables.length) {
            index = 0;
        }
        if (index <0) {
            index = focusables.length - 1
        }
        focusables[index].focus();
    }
    // Ouverture de la modale
    buttonPortfolio.addEventListener('click', openModal);
    // Ajout de la possibilité de focus la croix avec tab et de fermer avec échap
    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e);
        }
        if (e.key === 'Tab' && modal !== null) {
            focusInModal(e);
        }
    });

    // Contenu de la modale
    // Récupération des projets
    const reponse = await fetch('http://localhost:5678/api/works');
    const worksModale = await reponse.json();

    // Création de la fonction permettant de générer les fiches projets dans la modale
    async function generateWorksModale(worksModale) {
        // Création des fiches projets de la modale
        for (let workElement of worksModale) {    
            const galleryModal = document.getElementById("modal-works");
            // Création d'une fiche projet, rattachée à la galerie de la modale
            const work = document.createElement("article");
            work.classList.add('modal-work');
            galleryModal.appendChild(work);
            // Création de l'image, rattachée à la fiche projet
            const imageWork = document.createElement("img");
            imageWork.src = workElement.imageUrl;
            work.appendChild(imageWork);
            // Création du titre, rattaché à la fiche projet
            const titleWork = document.createElement("a");
            titleWork.href = "#";
            titleWork.innerText = "éditer";
            work.appendChild(titleWork);
            const icone = document.createElement("span");
            icone.classList.add('icone-modale-container');
            if (workElement == worksModale[0]) {
                icone.innerHTML = "<a href='#'><i class='fa-solid fa-arrows-up-down-left-right fa-xs icone-modale'></i></a><a href='#'><i class='fa-solid fa-trash-can fa-xs icone-modale'></i></a>";
            } else {
                icone.innerHTML = "<a href='#'><i class='fa-solid fa-trash-can icone-modale fa-xs'></i></a>"
            }
            work.appendChild(icone);
        }
    }
    // On appelle la fonction pour générer les fiches
    generateWorksModale(worksModale);
};