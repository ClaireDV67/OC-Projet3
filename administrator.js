const token = window.sessionStorage.getItem("token");
console.log(token);
if (token != null) {
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
        window.sessionStorage.removeItem("userId");
        window.sessionStorage.removeItem("token");
        location.reload();
    }
    menuLogout.addEventListener('click', logout);

    // Suppression des filtres
    const filters = document.getElementById('filters');
    filters.style.display = 'none';

    // Création de la modale
    // Contenu commun
    
    const modalWrapper = document.querySelector('.modal-wrapper');
    const buttonModal = document.createElement('div');
    buttonModal.classList.add('button-container');
    const titleModal = document.getElementById('title-modal');
    const buttonAdd = document.createElement('a');
    const buttonDelete = document.createElement('a');
    buttonAdd.href = '#';
    buttonAdd.classList.add('button-add', 'button-modale');
    buttonAdd.innerText = 'Ajouter une photo';
    buttonDelete.href = '#';
    buttonDelete.classList.add('button-delete', 'button-modale');
    buttonDelete.innerText = 'Supprimer la galerie';
    const contentModal = document.getElementById("modal-content");
    const buttonValidate = document.createElement('input');
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

    async function deleteWorks(e, id) {
        console.log("ffqf");
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            console.log("ok")
        }
        e.preventDefault();
        e.stopPropagation();
        // .then(res => {
        //     if (res.ok) {
        //         // const work = document.getElementById(`modal-work-${id}`);
        //         // contentModal.removeChild(work);
        //         // return res.json();
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }

    // Création de la fonction permettant de générer les fiches projets dans la modale
    async function generateWorksModal(worksModal) {
        // Création des fiches projets de la modale
        for (let workElement of worksModal) {    
            // Création d'une fiche projet, rattachée à la galerie de la modale
            const work = document.createElement("article");
            work.classList.add('modal-work');
            work.setAttribute('id', `modal-work-${workElement.id}`);
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
                icone.innerHTML = `<button><i class='fa-solid fa-arrows-up-down-left-right fa-xs icone-modal'></i></button><button id='trash-works-${workElement.id}'><i class='fa-solid fa-trash-can fa-xs icone-modal'></i></button>`;
            } else {
                icone.innerHTML = `<button id='trash-works-${workElement.id}'><i class='fa-solid fa-trash-can icone-modal fa-xs'></i></button>`;
            }
            work.appendChild(icone);
            const trashWorks = document.getElementById(`trash-works-${workElement.id}`);
            trashWorks.addEventListener('click', (e) => {e.preventDefault();
                deleteWorks(e, workElement.id)});
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
            modalWrapper.addEventListener('click', stopPropagation);
            titleModal.innerText = 'Galerie photo';
            modalWrapper.appendChild(buttonModal);
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
        modalWrapper.appendChild(buttonModal);
        iconModal.appendChild(iconClose);
        buttonModal.appendChild(buttonAdd);
        buttonModal.appendChild(buttonDelete);
        contentModal.innerHTML = '';
        generateWorksModal(worksModal);
    }

    // Récupération des catégories
    const reponseCat = await fetch('http://localhost:5678/api/categories');
    const categories = await reponseCat.json();
    // Récupération des noms des catégories
    const categoriesNames = categories.map(categorie => categorie.name);
    // Vérification de l'unicité de chaque catégorie
    const categoriesSet = new Set();
    for (let i in categoriesNames) {
        categoriesSet.add(categoriesNames[i])
    };

    // Fonction pour changer de modale
    function changeModal(e) {
        e.preventDefault();
        titleModal.innerHTML = 'Ajout Photo';
        iconModal.appendChild(iconBack);
        contentModal.innerHTML = '<form class="form-element form-modal"><div class="preview-container"><img id="preview-picture" style="display: none" src="#" alt="Aperçu image" /><div class="input-modal add-picture-container"><i class="fa-regular fa-image fa-5x"></i><label id="button-add-picture" for="button-add-picture-input">+ Ajouter photo</label><input type="file" name="image" accept=".png, .jpg" id="button-add-picture-input"><span class="txt-add-picture">jpg, png : 4mo max</span></div></div><label class="label" for="title-modal-add">Titre</label><input class="text-zone input-modal" id="title-modal-add" type="text" name="title" minlength="3" maxlength="50" required></input><label class="label" for="category-modal">Catégorie</label><select class="text-zone input-modal" id="category-modal" name="category" required><option value="" selected disabled></option></select></form>';
        const previewPicture = document.getElementById('preview-picture');
        const buttonAddPicture = document.getElementById('button-add-picture-input');
        const addPictureContainer = document.querySelector('.add-picture-container');
        buttonAddPicture.addEventListener('change', () => {
            const [file] = buttonAddPicture.files
            if (file) {
                previewPicture.src = URL.createObjectURL(file);
                addPictureContainer.style.display = 'none';
                previewPicture.style.display = null;
            }
        });
        while ( buttonModal.firstChild ) {
            buttonModal.removeChild( buttonModal.firstChild);
        }
        const formModal = document.querySelector('.form-modal');
        // modalWrapper.removeChild(buttonModal);
        formModal.appendChild(buttonModal);
        buttonValidate.setAttribute('type', 'submit');
        buttonValidate.setAttribute('value', 'Valider');
        buttonValidate.setAttribute('disabled', '');
        buttonValidate.classList.add('button-modale', 'button-add-work');
        buttonModal.appendChild(buttonValidate);
        const titleAddInput = document.getElementById('title-modal-add');
        const categoriesModal = document.getElementById('category-modal');
        function isComplete() {
            if (buttonAddPicture.value != '' && titleAddInput.value != '' && categoriesModal.value != '') {
                buttonValidate.setAttribute('disabled', 'false');
            } else {
                buttonValidate.setAttribute('disabled', 'true');
            }
        }
        buttonAddPicture.addEventListener('change', isComplete);
        titleAddInput.addEventListener('change', isComplete);
        categoriesModal.addEventListener('change', isComplete);
        iconBack.addEventListener('click', backModal);
        for (let categorie of categoriesSet) {
            const optionCategoriesModal = document.createElement('option');
            optionCategoriesModal.setAttribute('value', `${categorie}`);
            categoriesModal.appendChild(optionCategoriesModal);
            optionCategoriesModal.innerText = `${categorie}`;
        }
        function postWork() {
            // const formModal = document.querySelector('.form-modal');
            console.log('dfsf')
            var formData = new FormData();
            formData.append('image', document.getElementById('button-add-picture-input').files[0]);
            formData.append('title', document.getElementById('title-modal-add').value);
            formData.append('category', document.getElementById('category-modal').value);
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            .then(res => {
                if (res.ok) {
                    console.log('Réussi !')
                    return res.json();
                }
            })
            .catch(err => {
                console.log(err);
            })
        };
        console.log('ici')
        buttonValidate.addEventListener('click', () => console.log('fonction'));
    }
    
    buttonAdd.addEventListener('click', changeModal);
};