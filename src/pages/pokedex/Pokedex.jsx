import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Pokedex.module.css";

const pokemonTypes = {
  bug: "./img/types/bug.png",
  dark: "./img/types/dark.png",
  dragon: "./img/types/dragon.png",
  electric: "./img/types/electric.png",
  fairy: "./img/types/fairy.png",
  fighting: "./img/types/fighting.png",
  fire: "./img/types/fire.png",
  flying: "./img/types/flying.png",
  ghost: "./img/types/ghost.png",
  grass: "./img/types/grass.png",
  ground: "./img/types/ground.png",
  ice: "./img/types/ice.png",
  normal: "./img/types/normal.png",
  poison: "./img/types/poison.png",
  psychic: "./img/types/psychic.png",
  rock: "./img/types/rock.png",
  steel: "./img/types/steel.png",
  water: "./img/types/water.png",
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
  const [selectedPokemon, setSelectedPokemon] = useState(null);

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
            height: res.data.height,
            weight: res.data.weight,
            abilities: res.data.abilities.map((a) => a.ability.name),
          };
        });

        const pokemonsData = await Promise.all(promises);
        setPokemons(pokemonsData);

        if (pokemonsData.length > 0) {
          setSelectedPokemon(pokemonsData[0]);
        }
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <ul className={styles.pokemonList}>
            {pokemons.map((pokemon, index) => {
              const mainType = pokemon.types && pokemon.types[0];
              const cardColor = typeColors[mainType] || "#FFFFFF";
              const id = getPokemonId(pokemon.url);

              return (
                <li
                  key={index}
                  className={styles.card}
                  style={{ backgroundColor: cardColor }}
                >
                  <p>Nº {String(id).padStart(4, "0")}</p>

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
        </div>
        <div className={styles.containerRight}>
          {selectedPokemon ? (
            <div className={styles.detailsWrapper}>
              <h2 className={styles.detailsTitle}>
                {selectedPokemon.name.toUpperCase()}
              </h2>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonId(
                  selectedPokemon.url,
                )}.png`}
                alt={selectedPokemon.name}
                className={styles.detailsImage}
                style={{ maxWidth: "120px", maxHeight: "120px" }}
              />

              <p>
                Nº {String(getPokemonId(selectedPokemon.url)).padStart(4, "0")}
              </p>

              <div className={styles.detailsInfo}>
                <p>
                  <strong>Height:</strong> {selectedPokemon.height / 10} m
                </p>
                <p>
                  <strong>Weight:</strong> {selectedPokemon.weight / 10} kg
                </p>

                <strong>Type:</strong>
                <div className={styles.type}>
                  {selectedPokemon.types.map((typeName) => (
                    <img
                      key={typeName}
                      src={pokemonTypes[typeName]}
                      alt={typeName}
                      style={{ maxWidth: "30px" }}
                    />
                  ))}
                </div>
                <div className={styles.abilitiesContainer}>
                  <p>
                    <strong>Abilities:</strong>
                  </p>

                  <ul>
                    {selectedPokemon.abilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <p>Clique em um Pokemon para ver os detalhes</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Pokedex;
