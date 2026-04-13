export class ScreenController {
  constructor(logic, DOMRenderer) {
    this.controller = logic;
    this.renderer = DOMRenderer;

    const actions = {
      toSearch: (coords, searchInput) => {
        this.updateScreenData(coords, searchInput);
      },
      toUseGPS: () => {
        this.handleLocationRequest();
      },
    };

    this.renderer.bindEvents(actions);
    this.initiateApp();
  }

  async initiateApp() {
    try {
      const permissions = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissions.state === "granted") {
        const userLocation = await this.controller.getUserCurrentPosition();
        await this.updateScreenData(userLocation);
      } else if (permissions.state === "denied") {
        await this.updateScreenData();
      } else if (permissions.state === "prompt") {
        this.updateScreenData();
        try {
          const result = await this.controller.getUserCurrentPosition();
          await this.updateScreenData(result);
        } catch (rejectionError) {
          console.log(rejectionError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateScreenData(coords = null, textSearch) {
    try {
      if (coords) {
        await this.controller.getDataFromAPI(
          `${coords.latitude}, ${coords.longitude}`,
        );
      } else if (textSearch) {
        await this.controller.getDataFromAPI(textSearch);
      } else {
        await this.controller.getDataFromAPI();
      }

      // DOMRenderer;
      this.updateCurrentConditions();

      console.log("data fetched correctly", this.controller.currentCity);
    } catch (error) {
      console.log(error);
    }
  }

  async handleLocationRequest() {
    try {
      const userLocation = await this.controller.getUserCurrentPosition();

      if (userLocation) {
        this.updateScreenData(userLocation);
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateCurrentConditions() {
    const data = this.controller.currentCity.currentConditions;
    const temperature = this.getTemperatureInCelsius(data.temp);

    const icon = data.icon;
    const conditions = data.conditions;
    const feelsLike = this.getTemperatureInCelsius(data.feelsLike);
    const sunrise = data.sunrise.split("").splice(0, 5).join("");
    const sunset = data.sunset.split("").splice(0, 5).join("");
    const UVIndex = data.uvindex;
    // const resolvedAddress = data.

    this.renderer.displayCurrentConditions(
      temperature,

      icon,
      conditions,
      feelsLike,
      sunrise,
      sunset,
      UVIndex,
    );
  }

  updateHourlyClimate() {}

  updateDailyConditions() {}

  getTemperatureInCelsius(value) {
    return (((value - 32) * 5) / 9).toFixed();
  }
}
