class HeaderView {
  _searchBtn = document.querySelector(".search__btn");
  _searchInput = document.querySelector(".search__field");

  addHandlerSearch() {
    this._searchBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const pokemonName = this._searchInput.value.toLowerCase();
      window.location.hash = `pokemon/${pokemonName}`;
      this._searchInput.value = "";
    });
  }
}

export default new HeaderView();
