class FavoritesView {
  _parentElement = document.querySelector(".favorites-list");
  _dropdown = document.querySelector(".favorites-dropdown");
  _container = document.querySelector(".favorites-container");

  render(data) {
    if (!data || data.length === 0) {
      this._parentElement.innerHTML =
        '<p style="text-align:center; padding: 10px;">No favorites yet.</p>';
      return;
    }

    const markup = data
      .map(
        (fav) => `
      <li class="fav-item" data-name="${fav.name}">
        <img src="${fav.sprites.small}" alt="${fav.name}">
        <span>${fav.name}</span>
      </li>
    `,
      )
      .join("");

    this._parentElement.innerHTML = markup;
  }

  addHandlerSelectFav() {
    this._parentElement.addEventListener("click", (e) => {
      const pokemon = e.target.closest(".fav-item");

      if (!pokemon) return;

      const pokemonName = pokemon.dataset.name;

      window.location.hash = `pokemon/${pokemonName}`;

      this._dropdown.classList.toggle("hide");
    });
  }

  addHandlerHover(handler) {
    this._container.addEventListener("click", (e) => {
      if (e.target.closest(".favorites-list")) return;

      this._dropdown.classList.toggle("hide");
      if (!this._dropdown.classList.contains("hide")) handler();
    });
  }
}

export default new FavoritesView();
