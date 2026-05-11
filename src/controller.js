import {
  loadFavorites,
  loadPokemonRegion,
  persistFavorites,
  setActivePokemon,
  state,
} from "./model";
import PokemonView from "./Views/PokemonView";
import NavigationView from "./Views/NavigationView";
import ModalView from "./Views/ModalView";
import AppView from "./Views/AppView";
import HeaderView from "./Views/HeaderView";
import FavoritesView from "./Views/FavoritesView";
import ErrorView from "./Views/ErrorView";

const controlPokemonCards = async () => {
  try {
    const id = window.location.hash.split("/").at(-1);

    if (!id) return;

    NavigationView.updateActiveButton(id);

    PokemonView.renderSpinner();

    await loadPokemonRegion(id);

    PokemonView.render(state.pokemonRegionList);
  } catch (error) {
    console.error(error);
    ErrorView.render("Erro ao carregar a região. Verifique sua conexão.");
  }
};

const controlModalPokemon = async () => {
  try {
    const pokemonName = window.location.hash.split("/").at(-1);

    if (!pokemonName) return;

    ModalView.renderSpinner();

    await setActivePokemon(pokemonName);

    const isFav = state.pokemonFavoriteList.some(
      (pokemon) => pokemon.name === state.activePokemon.name,
    );

    if (!state.activePokemon.weight)
      throw new Error("Fail to get datail information");

    ModalView.render(state.activePokemon, isFav);
  } catch (error) {
    console.error(error);
    ModalView.renderError(
      "Não conseguimos encontrar esse Pokémon. Tente buscar por outro nome!",
    );
  }
};

const controlFavs = () => {
  const isAlreadyFavorite = state.pokemonFavoriteList.some(
    (fav) => fav.name === state.activePokemon.name,
  );

  if (!isAlreadyFavorite) {
    state.pokemonFavoriteList.push(state.activePokemon);
  } else {
    const index = state.pokemonFavoriteList.indexOf(state.activePokemon);
    state.pokemonFavoriteList.splice(index, 1);
  }

  persistFavorites();
};

const routing = () => {
  const resource = window.location.hash.split("/").at(0);

  switch (resource) {
    case "#region":
      controlPokemonCards();
      break;
    case "#pokemon":
      controlModalPokemon();
      break;
    default:
      break;
  }
};

const constrolDisplayFavs = () => {
  FavoritesView.render(state.pokemonFavoriteList);
};

loadFavorites();
PokemonView.addHandlerSelectPokemon();
NavigationView.addHandlerClick();
ModalView.addHandlerCloseModal();
ModalView.addHandlerFavBtn(controlFavs);
HeaderView.addHandlerSearch();
AppView.addHandlerRouting(routing);
FavoritesView.addHandlerHover(constrolDisplayFavs);
FavoritesView.addHandlerSelectFav();
