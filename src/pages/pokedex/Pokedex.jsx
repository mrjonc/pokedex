import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Pokedex.module.css";

const pokemonTypes = {
  bug: "./src/assets/img/types/bug.png",
  dark: "./src/assets/img/types/dark.png",
  dragon: "./src/assets/img/types/dragon.png",
  electric: "./src/assets/img/types/electric.png",
  fairy: "./src/assets/img/types/fairy.png",
  fighting: "./src/assets/img/types/fighting.png",
  fire: "./src/assets/img/types/fire.png",
  flying: "./src/assets/img/types/flying.png",
  ghost: "./src/assets/img/types/ghost.png",
  grass: "./src/assets/img/types/grass.png",
  ground: "./src/assets/img/types/ground.png",
  ice: "./src/assets/img/types/ice.png",
  normal: "./src/assets/img/types/normal.png",
  poison: "./src/assets/img/types/poison.png",
  psychic: "./src/assets/img/types/psychic.png",
  rock: "./src/assets/img/types/rock.png",
  steel: "./src/assets/img/types/steel.png",
  water: "./src/assets/img/types/water.png",
};

const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
};

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
        );
        const results = response.data.results;

        const promises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            types: res.data.types.map((t) => t.type.name),
          };
        });

        const pokemonsData = await Promise.all(promises);
        setPokemons(pokemonsData);
      } catch (error) {
        console.error("Erro ao buscar os pokemons", error);
      }
    };
    getPokemons();
  }, []);

  const getPokemonId = (url) => {
    const splitUrl = url.split("/");
    return splitUrl[splitUrl.length - 2];
  };

  console.log(pokemons);
  return (
    <>
      <ul className={styles.pokemonList}>
        {pokemons.map((pokemon, index) => {
          const mainType = pokemon.types && pokemon.types[0];
          const cardColor = typeColors[mainType] || "#FFFFFF";
          const id = getPokemonId(pokemon.url);

          return (
            <li
              key={index}
              className={styles.container}
              style={{ backgroundColor: cardColor }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={pokemon.name}
                style={{ maxWidth: "120px", maxHeight: "120px" }}
              />
              <p>{pokemon.name.toUpperCase()}</p>

              <div className={styles.typeContainer}>
                {pokemon.types.map((typeName) => (
                  <img
                    key={typeName}
                    src={pokemonTypes[typeName]}
                    alt={typeName}
                    style={{ maxWidth: "30px" }}
                  />
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Pokedex;
