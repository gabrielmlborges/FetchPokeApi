class AppView {
  addHandlerRouting(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler),
    );
  }
}

export default new AppView();
