class ModalView {
  _parentElement = document.querySelector(".pokemon-detail");
  _modal = document.querySelector("dialog");

  _clear() {
    this._parentElement.innerHTML = "";
  }

  render(data, isFav) {
    this._clear();

    const markup = this._generateMarkup(data, isFav);

    this._parentElement.insertAdjacentHTML("afterbegin", markup);

    this._modal.showModal();
  }

  renderError(
    message = "Não foi possível carregar os detalhes deste Pokémon.",
  ) {
    this._clear();
    const markup = `
    <div class="modal-error">
      <div class="error-content">
        <div class="error-icon">🕵️‍♂️</div>
        <h2>Ops! Algo deu errado</h2>
        <p>${message}</p>
      </div>
      <button type="button" class="close__btn">
        <svg class="favorite__icon" viewBox="0 0 512.021 512.021">
          <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"></path>
        </svg>
      </button>
    </div>
  `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    this._modal.showModal();
  }

  _generateMarkup(pokemon, isFav) {
    const typesString =
      pokemon.types
        ?.map(
          (type) =>
            `<span class="pokemon-type-${type} detail-type">${type}</span>`,
        )
        .join(" ") ?? "";

    return `
        <div class="modal-content">
            <div class="column image-box">
                <img src="${pokemon.sprites.large}" alt="${pokemon.name}">
            </div>
            <div class="column details-box">
                <h2 class="pokemon-name"> ${pokemon.name} </h2>
                <p><strong>Types:</strong> ${typesString} </p>
                <p><strong>Peso:</strong> ${pokemon.weight}kg</p>
                <p><strong>Tamanho:</strong> ${pokemon.height}m</p>
            </div>
            <div class="column stats-box">
                <p><strong>HP:</strong> ${pokemon.stats.hp}</p>
                <p><strong>Attack:</strong> ${pokemon.stats.attack}</p>
                <p><strong>Defense:</strong> ${pokemon.stats.defense}</p>
                <p><strong>Special-Attck:</strong> ${pokemon.stats.specialAttack}</p>
                <p><strong>Special-Defense:</strong> ${pokemon.stats.specialDefense}</p>
                <p><strong>Speed:</strong> ${pokemon.stats.speed}</p>
            </div>
        </div>
        <button type="button" class="favorite__btn modal__btn ${isFav ? "" : "hide"}">
                  <svg class="favorite__icon" viewBox="0 0 24 24">
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
        </button>
        <button type="button" class="favorite__btn modal__btn ${isFav ? "hide" : ""}">
            <svg class="favorite__icon" viewBox="0 0 24 24">
      <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"></path>
            </svg>
        </button>
        <button type="button" class="close__btn">
          <svg class="favorite__icon" viewBox="0 0 512.021 512.021">
          <path d="M301.258,256.01L502.645,54.645c12.501-12.501,12.501-32.769,0-45.269c-12.501-12.501-32.769-12.501-45.269,0l0,0   L256.01,210.762L54.645,9.376c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.762,256.01L9.376,457.376   c-12.501,12.501-12.501,32.769,0,45.269s32.769,12.501,45.269,0L256.01,301.258l201.365,201.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.258,256.01z"></path>
      </svg>
        </button>
    `;
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

  addHandlerCloseModal() {
    this._modal.addEventListener("click", (event) => {
      const closeBtn = event.target.closest(".close__btn");

      if (!closeBtn) return;

      this._modal.close();

      window.location.hash = "";
    });
  }

  addHandlerFavBtn(handler) {
    this._modal.addEventListener("click", (event) => {
      const favBtn = event.target.closest(".favorite__btn");

      if (!favBtn) return;

      handler();

      const hiddenBtn = this._modal.querySelector(".hide");

      hiddenBtn.classList.toggle("hide");

      favBtn.classList.toggle("hide");
    });
  }
}

export default new ModalView();
