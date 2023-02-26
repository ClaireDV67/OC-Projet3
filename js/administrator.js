// Importation des données et fonctions
import { edit } from "./edit.js";

// Stockage du token dans une constante
export const token = window.sessionStorage.getItem("token");

// Si présence du token dans sessionStorage, poursuite en mode édition
if (token != null) {
	edit();
}