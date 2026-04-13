export class DOMRenderer {
  constructor() {
    this.searchInput = document.querySelector("#search-input");
    this.btnGPS = document.querySelector("#check-location");
  }

  bindEvents(actions) {
    this.btnGPS.addEventListener("click", actions.toUseGPS);
    this.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const inputValue = this.searchInput.value;
        actions.toSearch(null, inputValue);
      }
    });
  }
}
