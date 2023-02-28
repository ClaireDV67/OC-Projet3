// Galerie
const gallery = document.querySelector(".gallery");

export function generateOneWork(workElement) {
// Création d'une fiche projet, rattachée à la galerie
	const work = document.createElement("figure");
	work.setAttribute("id", `work-${workElement.id}`);
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