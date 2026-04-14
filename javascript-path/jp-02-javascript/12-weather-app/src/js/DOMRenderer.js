export class DOMRenderer {
  constructor() {
    this.currentLocationH3 = document.querySelector("#current-location");
    this.dateFormattedContainer = document.querySelector("#date-formatted");
    this.searchInput = document.querySelector("#search-input");
    this.btnGPS = document.querySelector("#check-location");
    this.currentConditionsGeneralContainer = document.querySelector(
      ".current-conditions-general",
    );
    this.hourlyForecastCardsContainer =
      document.querySelector("#cards-container");
    this.currentConditionsMoreInfoContainer = document.querySelector(
      ".current-conditions-more-info",
    );
    this.weekContainer = document.querySelector(".week-container");
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

  displayHeader(resolvedAddress, dateFormatted) {
    this.currentLocationH3.innerHTML = resolvedAddress;
    this.dateFormattedContainer.innerHTML = dateFormatted;
  }

  displayCurrentConditionsMoreInfo(
    humidity,
    windSpeed,
    visibility,
    cloudCover,
  ) {
    const container = this.currentConditionsMoreInfoContainer;
    const htmlString = `
      <div class="card blur-container">
        <div class="top">
          <h4>Humidity</h4>
          <svg><use href="#humidity-icon"></use></svg>
        </div>
        <h1>${humidity}<span>%</span></h1>
      </div>
      <div class="card blur-container">
        <div class="top">
          <h4>Wind Speed</h4>
          <svg><use href="#wind-icon"></use></svg>
        </div>
        <h1>${windSpeed}<span>km/h</span></h1>
      </div>
      <div class="card blur-container">
        <div class="top">
          <h4>Visibility</h4>
          <svg><use href="#visibility-icon"></use></svg>
        </div>
        <h1>${visibility}<span>km</span></h1>
      </div>
      <div class="card blur-container">
        <div class="top">
          <h4>Cloud Cover</h4>
          <svg><use href="#cloud-cover-icon"></use></svg>
        </div>
        <h1>${cloudCover}<span>%</span></h1>
      </div>
    `;
    container.innerHTML = htmlString;
  }

  displayCurrentConditions(
    temperature,
    icon,
    conditions,
    feelsLike,
    sunrise,
    sunset,
    UVIndex,
    UVColor,
  ) {
    const container = this.currentConditionsGeneralContainer;
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

    container.innerHTML = htmlString;
  }

  displayDailyForecast(weekDaysFormatted, weekData) {
    console.log(weekDaysFormatted, weekData);
    const container = this.weekContainer;
    let days = "";
    for (let i = 0; i < 7; i++) {
      days += `
        <div class="day blur-container">
          <h4>${weekDaysFormatted[i]}</h4>
          <img
            src="./images/${weekData[i].icon}.svg"
            alt="daily-forecast-icon"
            class="daily-forecast-icon"
          />
          <div class="temp-container">
            <h3>${weekData[i].tempmax}°</h3>
            <span>${weekData[i].tempmin}°</span>
          </div>
        </div>`;
    }

    container.innerHTML = days;
  }

  displayHourlyForecast(array) {
    const container = this.hourlyForecastCardsContainer;
    container.innerHTML = "";
    let card = "";

    for (let i = 0; i < array.length; i++) {
      card += `    
        <div class="card blur-container">    
          <span>${array[i].hour}</span>
          <img
            src="./images/${array[i].icon}.svg"
            alt="hourly-forecast-icon"
            class="hourly-forecast-icon"
          />
          <h3>${array[i].temp}°</h3>
        </div>`;
    }

    container.innerHTML = card;
  }
}
