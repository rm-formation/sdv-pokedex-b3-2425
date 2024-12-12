export default class Pokemon {
    id;
    nom;
    imgUrl;

    constructor(json) {
        this.id = json.id;
        this.nom = json.name;
        //this.imgUrl = json.sprites.other["official-artwork"].front_default;
        //this.imgUrl = json.sprites.other.showdown.front_default;
        this.imgUrl = json.sprites.versions["generation-i"]["red-blue"]["front_transparent"];
    }

    static async chargerListePokemons() {
        const responsePokemons = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
        const json = await responsePokemons.json();
        const listePokemons = json.results;

        let tableauPromises = [];

        for (let i = 0; i < listePokemons.length; i++) {
            const detailsPokemon = listePokemons[i];
            const promisePokemon = this.recupererJsonPokemon(detailsPokemon.url);
            tableauPromises.push(promisePokemon);
        }

        const pokemons = await Promise.all(tableauPromises);
        return pokemons;
    }

    static async recupererJsonPokemon(url) {
        const responsePokemon = await fetch(url);
        const jsonPokemon = await responsePokemon.json();
        const pokemon = new Pokemon(jsonPokemon);
        return pokemon;
    }
}
