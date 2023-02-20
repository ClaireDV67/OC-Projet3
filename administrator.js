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
    buttonIntroduction.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
    buttonIntroduction.setAttribute('id', 'button-introduction');

    const buttonPortfolio = document.createElement('a');
    const works = document.getElementById('works');
    works.appendChild(buttonPortfolio);
    buttonPortfolio.href = '#modal';
    buttonPortfolio.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
    buttonPortfolio.setAttribute('id', 'button-portfolio');

    const buttonArticle = document.createElement('a');
    const introductionArticle = document.getElementById('introduction-article');
    const articleTitle = document.getElementById('intro-article-title');
    introductionArticle.insertBefore(buttonArticle, articleTitle);
    buttonArticle.href = '#';
    buttonArticle.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>modifier";
    buttonArticle.setAttribute('id', 'button-article');

    // Modification du menu avec logout
    const menu = document.getElementById('menu');
    const menuLogin = document.getElementById('menu-login');
    const menuLogout = document.createElement('li');
    menuLogout.setAttribute('id', 'menu-logout');
    menuLogout.innerHTML = "<a href='#'>logout</a>";
    menu.replaceChild(menuLogout, menuLogin);
    function logout(e) {
        e.preventDefault();
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("token");
        location.reload();
    }
    menuLogout.addEventListener('click', logout);

    // Suppression des filtres
    const portfolio = document.getElementById('portfolio');
    const filters = document.getElementById('filters');
    portfolio.removeChild(filters);

    // Création de la modale
    // Contenu commun
    const titleModal = document.getElementById('title-modal');
    const buttonModal = document.querySelector('.button-container');
    const buttonAdd = document.createElement('a');
    const buttonDelete = document.createElement('a');
    buttonAdd.href = '#';
    buttonAdd.classList.add('button-add', 'button-modale');
    buttonAdd.innerText = 'Ajouter une photo';
    buttonDelete.href = '#';
    buttonDelete.classList.add('button-delete', 'button-modale');
    buttonDelete.innerText = 'Supprimer la galerie';
    const contentModal = document.getElementById("modal-content");
    const buttonValidate = document.createElement('a');
    const iconModal = document.getElementById('modal-icon');
    const iconClose = document.createElement('a');
    iconClose.href = '#';
    iconClose.classList.add('modal-close');
    iconClose.innerHTML = '<i class="fa-solid fa-xmark fa-xl"></i>';
    iconModal.appendChild(iconClose);
    const iconBack = document.createElement('a');
    iconBack.href = '#';
    iconBack.innerHTML = '<i class="fa-solid fa-arrow-left fa-xl"></i>';
    

    // Contenu de la première modale
    // Récupération des projets
    const reponse = await fetch('http://localhost:5678/api/works');
    const worksModal = await reponse.json();

    // Création de la fonction permettant de générer les fiches projets dans la modale
    async function generateWorksModal(worksModal) {
        // Création des fiches projets de la modale
        for (let workElement of worksModal) {    
            const contentModal = document.getElementById("modal-content");
            // Création d'une fiche projet, rattachée à la galerie de la modale
            const work = document.createElement("article");
            work.classList.add('modal-work');
            contentModal.appendChild(work);
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
            icone.classList.add('icone-modal-container');
            if (workElement == worksModal[0]) {
                icone.innerHTML = "<a href='#'><i class='fa-solid fa-arrows-up-down-left-right fa-xs icone-modal'></i></a><a href='#'><i class='fa-solid fa-trash-can fa-xs icone-modal'></i></a>";
            } else {
                icone.innerHTML = "<a href='#'><i class='fa-solid fa-trash-can icone-modal fa-xs'></i></a>"
            }
            work.appendChild(icone);
        }
    }

    async function generateModal() {
        let modal = null;
        const focusableSelector = "button, a, input, textarea";
        let focusables = [];
        let previouslyFocusedElement = null;
        // Ouverture de la modale
        function openModal(e) {
            e.preventDefault();
            const modal1 = document.getElementById('modal');
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
            titleModal.innerText = 'Galerie photo';
            while ( buttonModal.firstChild ) {
                buttonModal.removeChild( buttonModal.firstChild);
            }
            while ( iconModal.firstChild ) {
                iconModal.removeChild( iconModal.firstChild);
            }
            iconModal.appendChild(iconClose);
            buttonModal.appendChild(buttonAdd);
            buttonModal.appendChild(buttonDelete);
            contentModal.innerHTML = '';
            generateWorksModal(worksModal);
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
    };
    generateModal();

    // Bouton vers la seconde modale
    // Fonction pour revenir à la première modale
    function backModal(e) {
        e.preventDefault();
        titleModal.innerText = 'Galerie photo';
        while ( buttonModal.firstChild ) {
            buttonModal.removeChild( buttonModal.firstChild);
        }
        while ( iconModal.firstChild ) {
            iconModal.removeChild( iconModal.firstChild);
        }
        iconModal.appendChild(iconClose);
        buttonModal.appendChild(buttonAdd);
        buttonModal.appendChild(buttonDelete);
        contentModal.innerHTML = '';
        generateWorksModal(worksModal);
    }

    // Fonction pour changer de modale
    function changeModal(e) {
        e.preventDefault();
        titleModal.innerHTML = 'Ajout Photo';
        iconModal.appendChild(iconBack);
        contentModal.innerHTML = '<form class="form-element form-modal"><div class="input-modal add-picture-container"><i class="fa-regular fa-image fa-2xl"></i><a href="#" class="button-add-picture">+ Ajouter photo</a><span class="txt-add-picture">jpg, png : 4mo max</span></div><label class="label" for="title-modal">Titre</label><input class="text-zone input-modal" id="title-modal" type="text" name="title" minlength="3" maxlength="50" required></input><label class="label" for="category-modal">Catégorie</label><select class="text-zone input-modal" id="category-modal" name="category" required></select></form>';
        while ( buttonModal.firstChild ) {
            buttonModal.removeChild( buttonModal.firstChild);
        }
        buttonValidate.href = '#';
        buttonValidate.classList.add('button-disabled', 'button-modale');
        buttonValidate.innerText = 'Valider';
        buttonModal.appendChild(buttonValidate);
        iconBack.addEventListener('click', backModal);
    }
    buttonAdd.addEventListener('click', changeModal);
};