export const state = {
  activePokemon: {},
  pokemonRegionList: [],
  pokemonFavoriteList: [],
};

const API_URL = "https://pokeapi.co/api/v2/";

export const loadPokemonRegion = async (id) => {
  const response = await fetch(`${API_URL}pokedex/${id}`);

  if (!response.ok) throw new Error(`(${response.status})`);

  const data = await response.json();

  const initialList = data.pokemon_entries.map((entry) => ({
    entryNumber: entry.entry_number,
    name: entry.pokemon_species.name,
  }));

  const completeList = await loadPokemonDetail(initialList);

  state.pokemonRegionList = completeList;
};

const loadPokemonDetail = async (initialList) => {
  const promises = initialList.map(async (pokemon) => {
    const response = await fetch(`${API_URL}pokemon/${pokemon.name}`);

    if (!response.ok) return pokemon;

    const data = await response.json();

    return {
      ...pokemon,
      id: data.id,
      types: data.types.map((type) => type.type.name),
      height: data.height / 10,
      weight: data.weight / 10,
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
      sprites: {
        small: data.sprites.front_default,
        large: data.sprites.other["official-artwork"].front_default,
      },
    };
  });

  return await Promise.all(promises);
};

const fetchPokemonByName = async (pokemonName) => {
  const response = await fetch(`${API_URL}pokemon/${pokemonName}`);

  if (!response.ok) throw new Error(`(${response.status})`);

  const data = await response.json();

  return {
    name: data.name,
    id: data.id,
    types: data.types.map((type) => type.type.name),
    height: data.height / 10,
    weight: data.weight / 10,
    stats: {
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      specialAttack: data.stats[3].base_stat,
      specialDefense: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    },
    sprites: {
      small: data.sprites.front_default,
      large: data.sprites.other["official-artwork"].front_default,
    },
  };
};

export const setActivePokemon = async (pokemonName) => {
  let pokemon = state.pokemonRegionList.find(
    (pokemon) => pokemon.name === pokemonName,
  );

  if (!pokemon) pokemon = await fetchPokemonByName(pokemonName);

  state.activePokemon = pokemon;
};

export const persistFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(state.pokemonFavoriteList));
};

export const loadFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  if (favorites) state.pokemonFavoriteList = JSON.parse(favorites);
};
