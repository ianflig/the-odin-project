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
      this.updateHeaderDisplay();
      this.updateCurrentConditionsDisplay();
      this.updateHourlyForecastDisplay();

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

  updateHeaderDisplay() {
    const resolvedAddress = this.controller.currentCity.resolvedAddress;
    const dateFormatted = this.getCurrentDateFormatted();

    this.renderer.displayHeader(resolvedAddress, dateFormatted);
  }

  updateCurrentConditionsDisplay() {
    const data = this.controller.currentCity.currentConditions;

    const temperature = data.temp;
    const icon = data.icon;
    const conditions = data.conditions;
    const feelsLike = data.feelslike;
    const sunrise = data.sunrise.split("").splice(0, 5).join("");
    const sunset = data.sunset.split("").splice(0, 5).join("");
    const UVIndex = data.uvindex;
    const UVColor = this.getUVColor(data.uvindex);

    const humidity = data.humidity;
    const windSpeed = data.windspeed;
    const visibility = data.visibility;
    const cloudCover = data.cloudcover;

    this.renderer.displayCurrentConditions(
      temperature,
      icon,
      conditions,
      feelsLike,
      sunrise,
      sunset,
      UVIndex,
      UVColor,
    );

    this.renderer.displayCurrentConditionsMoreInfo(
      humidity,
      windSpeed,
      visibility,
      cloudCover,
    );
  }

  updateHourlyForecastDisplay() {
    const currenTime = this.getCurrentTime();
    const data = this.controller.getHourlyForecast({
      hour: currenTime,
    });
    console.log(data);
    const arrayCleaned = data.map((ele, index) => {
      return {
        hour:
          index === 0 ? "Now" : ele.datetime.split("").splice(0, 5).join(""),
        icon: ele.icon,
        temp: ele.temp,
      };
    });
    this.renderer.displayHourlyForecast(arrayCleaned);
  }

  updateDailyConditions() {}

  getUVColor(uvIndex) {
    if (uvIndex <= 2) return "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)";
    if (uvIndex <= 7) return "linear-gradient(90deg, #f6d365 0%, #fda085 100%)";
    return "linear-gradient(90deg, #ff0844 0%, #ffb199 100%)";
  }

  getCurrentDateFormatted() {
    const timeZone = this.controller.currentCity.timezone;
    const date = new Date().toLocaleDateString("en-US", {
      timeZone: timeZone,
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    return date;
  }

  getCurrentTime() {
    const timeZone = this.controller.currentCity.timezone;
    const currentTime = new Date()
      .toLocaleTimeString("es-AR", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .split("")
      .splice(0, 5)
      .join("");

    return currentTime;
  }
}
