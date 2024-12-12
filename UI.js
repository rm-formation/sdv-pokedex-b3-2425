//import DAO from "./DAO.js";
import * as DAO from "./DAOFonctions.js";
import Pokemon from "./Model/Pokemon.js";

let favoris;
let boutonPokedex;
let boutonFavoris;

export default async function initialiser() {
    const favorisStorage = await DAO.charger("favoris");
    if (favorisStorage !== null) {
        favoris = favorisStorage;
    } else {
        favoris = {};
    }

    boutonPokedex = document.querySelector(".bouton-pokedex");
    boutonPokedex.addEventListener("click", afficherPokedex);
    
    boutonFavoris = document.querySelector(".bouton-favoris");
    boutonFavoris.addEventListener("click", afficherFavoris);
}

async function afficherPokedex() {
    const listePokemons = await Pokemon.chargerListePokemons();
    await afficherListePokemons(listePokemons);
}

async function afficherFavoris() {
    const pokemons = Object.values(favoris);
    if (pokemons.length > 0) {
        await afficherListePokemons(pokemons, true);
    } else {
        const div = document.createElement("div");
        div.innerText = "Aucun favoris n'a été enregistré";
        //NE PAS FAIRE SUR UN VRAI PROJET
        div.style.whiteSpace = "nowrap";
        div.style.textAlign = "center";
        div.style.alignSelf = "center";
        div.style.gridColumn = "1 / 4";
        //FIN
        const conteneur = document.querySelector("main > section .conteneur");
        conteneur.append(div);
    }
}

async function afficherListePokemons(pokemons, pourFavoris = false) {
    const conteneur = document.querySelector("main > section .conteneur");
    conteneur.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        const jsonPokemon = pokemons[i];
        const divPokemon = creerDivPokemonListe(jsonPokemon, pourFavoris);
        conteneur.append(divPokemon);
    }
}

function creerDivPokemonListe(pokemon, pourFavoris = false) {
    const div = document.createElement("div");
    div.classList.add("div-pokemon-liste");
    div.setAttribute("data-pokemon-id", pokemon.id);

    const img = document.createElement("img");
    img.src = pokemon.imgUrl;

    const spanNom = document.createElement("span");
    spanNom.innerText = pokemon.nom;

    const spanId = document.createElement("span");
    spanId.innerText = pokemon.id;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    if (favoris[pokemon.id]) {
        cb.checked = true;
    }
    cb.addEventListener("change", function(e) {
        majStatutFavorisPokemon(div, pokemon, cb.checked, pourFavoris);
    });

    div.append(img);
    div.append(spanNom);
    div.append(spanId);
    div.append(cb);

    div.onclick = function(e) {
        if (e.target instanceof HTMLInputElement) {
            return;
        }
        afficherPokemon(pokemon);
    };

    return div;
}

function afficherPokemon(pokemon) {
    const div = creerDivPokemonListe(pokemon);
    const conteneur = document.querySelector("main > section .conteneur");
    conteneur.innerHTML = "";
    conteneur.append(div);
}

async function majStatutFavorisPokemon(div, pokemon, estFavoris, depuisPageFavoris) {
    if (estFavoris) {
        favoris[pokemon.id] = pokemon;
    } else {
        delete favoris[pokemon.id];
        if (depuisPageFavoris) {
            div.remove();
        }
    }
    await DAO.sauvegarder("favoris", favoris);
}