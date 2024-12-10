const pokemons = [
    {
        id: 1,
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/1.png",
        nom: "Bulbizarre",
    },
    {
        id: 4,
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/4.png",
        nom: "Salamèche",
    },
    {
        id: 7,
        imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/7.png",
        nom: "Carapuce",
    },
];

const boutonPokedex = document.querySelector(".bouton-pokedex");
boutonPokedex.addEventListener("click", afficherListePokemons);

function afficherListePokemons() {
    const conteneur = document.querySelector("main > section .conteneur");
    conteneur.innerHTML = "";
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        const divPokemon = creerDivPokemonListe(pokemon);
        conteneur.append(divPokemon);
    }
}

function creerDivPokemonListe(pokemon) {
    const div = document.createElement("div");
    div.classList.add("div-pokemon-liste");
    div.setAttribute("data-pokemon-id", pokemon.id);

    const img = document.createElement("img");
    img.src = pokemon.imgUrl;

    const spanNom = document.createElement("span");
    spanNom.innerText = pokemon.nom;

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