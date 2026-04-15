export class Background {
  constructor() {
    this.container = document.querySelector("#app-background");
  }

  render(iconString) {
    this.container.className = "";
    this.container.innerHTML = "";

    const isNight = iconString.includes("night");
    if (isNight) {
      this.container.classList.add("is-night");
    } else {
      this.container.classList.add("is-day");
    }

    if (iconString.includes("thunder")) {
      this.container.classList.add("bg-storm");
      this.container.innerHTML = `
        <div class="lightning"></div>
        <div class="precipitation rain-layer"></div>
      `;
    } else if (
      iconString.includes("snow") ||
      iconString.includes("sleet") ||
      iconString.includes("hail")
    ) {
      this.container.classList.add("bg-snow");
      this.container.innerHTML = `<div class="precipitation snow-layer"></div>`;
    } else if (iconString.includes("rain") || iconString.includes("showers")) {
      this.container.classList.add("bg-rain");
      this.container.innerHTML = `<div class="precipitation rain-layer"></div>`;
    } else if (iconString.includes("fog")) {
      this.container.classList.add("bg-fog");
      this.container.innerHTML = `<div class="fog-layer"></div>`;
    } else if (iconString.includes("cloud")) {
      this.container.classList.add("bg-cloudy");
      this.container.innerHTML = `<div class="cloud-layer"></div>`;
    } else {
      this.container.classList.add("bg-clear");
      this.container.innerHTML = isNight
        ? `<div class="celestial moon"></div>`
        : `<div class="celestial sun"></div>`;
    }
  }
}
