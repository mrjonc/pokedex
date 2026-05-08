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

const generations = {
  1: { limit: 151, offset: 0 },
  2: { limit: 100, offset: 151 },
  3: { limit: 135, offset: 251 },
  4: { limit: 107, offset: 386 },
  5: { limit: 156, offset: 493 },
  6: { limit: 72, offset: 649 },
  7: { limit: 88, offset: 721 },
  8: { limit: 96, offset: 809 },
  9: { limit: 120, offset: 905 },
};

function Pokedex({ search }) {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [gen, setGen] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const { limit, offset } = generations[gen];
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        );
        const results = response.data.results;

        const promises = results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: res.data.id,
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
      } finally {
        setLoading(false);
      }
    };
    getPokemons();
  }, [gen]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search?.toLowerCase() || ""),
  );
  const selectedPokemonMainType =
    selectedPokemon?.types && selectedPokemon.types[0];
  const selectedPokemonTypeColor =
    typeColors[selectedPokemonMainType] || "#FFFFFF";

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.filterContainer}>
            <label>Generation: </label>
            <select
              value={gen}
              id="generation"
              onChange={(e) => setGen(Number(e.target.value))}
            >
              <option value={1}>1ª Geração</option>
              <option value={2}>2ª Geração</option>
              <option value={3}>3ª Geração</option>
              <option value={4}>4ª Geração</option>
              <option value={5}>5ª Geração</option>
              <option value={6}>6ª Geração</option>
              <option value={7}>7ª Geração</option>
              <option value={8}>8ª Geração</option>
              <option value={9}>9ª Geração</option>
            </select>
          </div>

          {loading ? (
            <p>Carregando Pokédex...</p>
          ) : (
            <ul className={styles.pokemonList}>
              {filteredPokemons.length > 0 ? (
                filteredPokemons.map((pokemon) => {
                  const mainType = pokemon.types && pokemon.types[0];
                  const cardColor = typeColors[mainType] || "#FFFFFF";
                  return (
                    <li
                      key={pokemon.id}
                      className={styles.card}
                      style={{ backgroundColor: cardColor }}
                      onClick={() => setSelectedPokemon(pokemon)}
                    >
                      <p>Nº {String(pokemon.id).padStart(4, "0")}</p>

                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
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
                })
              ) : (
                <p>Nenhum Pokémon encontrado nesta geração</p>
              )}
            </ul>
          )}
        </div>

        <div
          className={styles.containerRight}
          style={{
            backgroundColor: selectedPokemonTypeColor,
            borderRadius: "1rem",
          }}
        >
          {selectedPokemon ? (
            <div className={styles.detailsWrapper}>
              <h2 className={styles.detailsTitle}>
                <strong>{selectedPokemon.name.toUpperCase()}</strong>
              </h2>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${selectedPokemon.id}.png`}
                alt={selectedPokemon.name}
                className={styles.detailsImage}
                style={{ maxWidth: "120px", maxHeight: "120px" }}
              />

              <strong>
                <p>Nº {String(selectedPokemon.id).padStart(4, "0")}</p>
              </strong>
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
                      <li key={index}>
                        <strong>{ability}</strong>
                      </li>
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
