export class DOMRenderer {
  constructor() {
    this.currentLocationH3 = document.querySelector("#current-location");
    this.searchInput = document.querySelector("#search-input");
    this.btnGPS = document.querySelector("#check-location");
    this.currentConditionsGeneralContainer = document.querySelector(
      ".current-conditions-general",
    );
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

  displayCurrentConditions(
    temperature,
    icon,
    conditions,
    feelsLike,
    sunrise,
    sunset,
    UVIndex,
    resolvedAddress,
  ) {
    const container = this.currentConditionsGeneralContainer;
    const UVColor = this.getUVColor(UVIndex);
    const htmlString = `
      <div class="left-side blur-container">
        <img src="./images/${icon}.svg" alt="weather-icon" class="weather-icon"/>
        <div>
          <h4>${temperature}<span>°C</span></h4>
          <span>${conditions}</span>
          <span>Feels like ${feelsLike}°C</span>
        </div>
      </div>
      <div class="right-side blur-container">
        <div class="top">
          <div class="sunrise blur-container">
            <div class="left">
              <svg><use href="#sunrise-icon"></use></svg>
              <span>Sunrise</span>
            </div>
            <div class="right">${sunrise}</div>
          </div>
          <div class="sunset blur-container">
            <div class="left">
              <svg><use href="#sunset-icon"></use></svg>
              <span>Sunset</span>
            </div>
            <div class="right">${sunset}</div>
          </div>
        </div>
        <div class="bottom">
          <label for="uv-progress">UV Index: ${UVIndex}</label>
          <progress
            id="uv-progress"
            class="uv-bar"
            max="11"
            value="${UVIndex}"
            style="--color-uv: ${UVColor};"
          ></progress>
        </div>
      </div>
    `;

    this.currentLocationH3 = resolvedAddress;
    container.innerHTML = htmlString;
  }

  getUVColor(uvIndex) {
    if (uvIndex <= 2) return "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)";
    if (uvIndex <= 7) return "linear-gradient(90deg, #f6d365 0%, #fda085 100%)";
    return "linear-gradient(90deg, #ff0844 0%, #ffb199 100%)";
  }
}
