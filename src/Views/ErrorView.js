class ErrorView {
  _parentElement = document.querySelector("main");

  render(message = "Algo deu errado. Tente novamente!") {
    const markup = `
      <div class="error">
        <div class="error__icon">⚠️</div>
        <p class="error__message">${message}</p>
      </div>
    `;
    this._parentElement.innerHTML = markup;
  }
}
export default new ErrorView();
