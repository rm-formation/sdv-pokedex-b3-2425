const boutonPokedex = document.querySelector(".bouton-pokedex");
boutonPokedex.addEventListener("click", afficherListePokemonsOptimisee);

async function afficherListePokemons() {
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
}

async function afficherListePokemonsOptimisee() {
    const responsePokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=5000");
    const json = await responsePokemons.json();
    const pokemons = json.results;

    const conteneur = document.querySelector("main > section .conteneur");
    conteneur.innerHTML = "";

    let tableauPromises = [];

    for (let i = 0; i < pokemons.length; i++) {
        const detailsPokemon = pokemons[i];
        const promisePokemon = recupererJsonPokemon(detailsPokemon.url);
        tableauPromises.push(promisePokemon);
    }

    const tableauJsons = await Promise.all(tableauPromises);

    for (let i = 0; i < tableauJsons.length; i++) {
        const jsonPokemon = tableauJsons[i];
        const divPokemon = creerDivPokemonListe(jsonPokemon);
        conteneur.append(divPokemon);
    }
}

async function recupererJsonPokemon(url) {
    const responsePokemon = await fetch(url);
    const jsonPokemon = await responsePokemon.json();
    return jsonPokemon;
}

function creerDivPokemonListe(pokemon) {
    const div = document.createElement("div");
    div.classList.add("div-pokemon-liste");
    div.setAttribute("data-pokemon-id", pokemon.id);

    const img = document.createElement("img");
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    //img.src = pokemon.sprites.other.showdown.front_default;
    //img.src = pokemon.sprites.versions["generation-i"]["red-blue"]["front_transparent"];

    const spanNom = document.createElement("span");
    spanNom.innerText = pokemon.name;

    const spanId = document.createElement("span");
    spanId.innerText = pokemon.id;

    div.append(img);
    div.append(spanNom);
    div.append(spanId);

    div.onclick = function() {
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