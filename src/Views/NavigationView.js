class NavigationView {
  _parentElement = document.querySelector("nav");
  _buttons = document.querySelectorAll(".region__btn");

  addHandlerClick() {
    this._parentElement.addEventListener("click", (event) => {
      const button = event.target.closest(".region__btn");

      if (!button) return;

      const pokedexId = button.dataset.pokedex;

      window.location.hash = `region/${pokedexId}`;
    });
  }

  updateActiveButton(id) {
    this._buttons.forEach((b) => {
      b.classList.remove("active");

      if (b.dataset.pokedex === id) b.classList.add("active");
    });
  }
}

export default new NavigationView();
