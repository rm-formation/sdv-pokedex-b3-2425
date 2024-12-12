let favoris = {};
const favorisStorage = localStorage.getItem("favoris");
if (favorisStorage) {
    favoris = JSON.parse(favorisStorage);
}

const boutonPokedex = document.querySelector(".bouton-pokedex");
boutonPokedex.addEventListener("click", afficherPokedex);

const boutonFavoris = document.querySelector(".bouton-favoris");
boutonFavoris.addEventListener("click", afficherFavoris);

/* async function afficherListePokemons() {
    const responsePokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=5000");
    const json = await responsePokemons.json();
    const pokemons = json.results;

    const conteneur = document.querySelector("main > section .conteneur");
    conteneur.innerHTML = "";

    for (let i = 0; i < pokemons.length; i++) {
        const detailsPokemon = pokemons[i];
        const responsePokemon = await fetch(detailsPokemon.url);
        const jsonPokemon = await responsePokemon.json();
        const divPokemon = creerDivPokemonListe(jsonPokemon);
        conteneur.append(divPokemon);
    }
} */

async function afficherPokedex() {
    const responsePokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
    const json = await responsePokemons.json();
    const listePokemons = json.results;

    let tableauPromises = [];

    for (let i = 0; i < listePokemons.length; i++) {
        const detailsPokemon = listePokemons[i];
        const promisePokemon = recupererJsonPokemon(detailsPokemon.url);
        tableauPromises.push(promisePokemon);
    }

    const pokemons = await Promise.all(tableauPromises);

    await afficherListePokemons(pokemons);
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

async function recupererJsonPokemon(url) {
    const responsePokemon = await fetch(url);
    const jsonPokemon = await responsePokemon.json();
    return jsonPokemon;
}

function creerDivPokemonListe(pokemon, pourFavoris = false) {
    const div = document.createElement("div");
    div.classList.add("div-pokemon-liste");
    div.setAttribute("data-pokemon-id", pokemon.id);

    const img = document.createElement("img");
    //img.src = pokemon.sprites.other["official-artwork"].front_default;
    //img.src = pokemon.sprites.other.showdown.front_default;
    img.src = pokemon.sprites.versions["generation-i"]["red-blue"]["front_transparent"];

    const spanNom = document.createElement("span");
    spanNom.innerText = pokemon.name;

    const spanId = document.createElement("span");
    spanId.innerText = pokemon.id;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    if (favoris[pokemon.id]) {
        cb.checked = true;
    }
    cb.addEventListener("change", function(e) {
        if (cb.checked) {
            favoris[pokemon.id] = pokemon;
        } else {
            delete favoris[pokemon.id];
            if (pourFavoris) {
                div.remove();
            }
        }
        localStorage.setItem("favoris", JSON.stringify(favoris));
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

function creerDivPokemonListeVersionInnerHTML(pokemon) {
    const div = document.createElement("div");
    div.classList.add("div-pokemon-liste");
    div.innerHTML = `
        <img src="${pokemon.imgUrl}">
        <span>${pokemon.nom}</span>
        <span>${pokemon.id}</span>
    `;
    return div;
}

function afficherPokemon(pokemon) {
    const div = creerDivPokemonListe(pokemon);
    const conteneur = document.querySelector("main > section .conteneur");
    conteneur.innerHTML = "";
    conteneur.append(div);
}