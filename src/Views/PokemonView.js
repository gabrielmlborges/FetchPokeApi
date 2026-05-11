class PokemonView {
  _parentElement = document.querySelector("main");

  _clear() {
    this._parentElement.innerHTML = "";
  }

  render(data) {
    this._clear();
    const markup = this._generateMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup(pokemonList) {
    return pokemonList
      .map((pokemon) => {
        const typesHTML =
          pokemon.types
            ?.map(
              (type) => `<small class="pokemon-type-${type}">${type}</small>`,
            )
            .join("") ?? "";

        return `
        <div class="pokemon-card" data-id="${pokemon.name ?? ""}">
        <img src="${pokemon.sprites?.small ?? ""}" alt="${pokemon.name}">
        <small class="pokemon-number">#${pokemon.entryNumber.toString().padStart(3, "0")}</small>
        <p class="pokemon-name">${pokemon.name}</p>
        <div class="types-container">
        ${typesHTML}
        </div>
        </div>
        `;
      })
      .join("");
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg width="60" height="60" viewBox="0 0 50 50" style="animation: rotate 2s linear infinite">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#316ab2" stroke-width="5" stroke-dasharray="31.4 31.4" />
        </svg>
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerSelectPokemon() {
    this._parentElement.addEventListener("click", (event) => {
      const card = event.target.closest(".pokemon-card");

      if (!card) return;

      const pokemonName = card.dataset.id;

      window.location.hash = `pokemon/${pokemonName}`;
    });
  }
}

export default new PokemonView();
