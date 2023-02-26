// Récupération des projets
const reponse = await fetch("http://localhost:5678/api/works");
export const worksData = await reponse.json();

// Récupération des catégories
const reponseCat = await fetch("http://localhost:5678/api/categories");
export const categories = await reponseCat.json();