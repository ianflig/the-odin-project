import {
  getCurrentTime,
  getCurrentTimeFormatted,
  getWeekDaysFormatted,
  getCurrentDateFormatted,
  getHourlyForecastFormatted,
} from "../utils/helpers.js";

export class ScreenController {
  constructor(logic, DOMRenderer) {
    this.model = logic;
    this.renderer = DOMRenderer;

    const actions = {
      toSearch: (coords, searchInput) => {
        this.updateScreenData(coords, searchInput);
      },
      toUseGPS: () => {
        this.handleLocationRequest();
      },
      toUpdateHourlyForecast: (day) => {
        this.updateHourlyForecastDisplay(day);
      },
      toToggleDaySwapState: (day) => {
        this.toggleDaySwapState(day);
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
        const userLocation = await this.model.getUserCurrentPosition();
        await this.updateScreenData(userLocation);
      } else if (permissions.state === "denied") {
        await this.updateScreenData();
      } else if (permissions.state === "prompt") {
        this.updateScreenData();
        try {
          const result = await this.model.getUserCurrentPosition();
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
      this.renderer.displaySkeleton();

      if (coords) {
        await this.model.getDataFromAPI(
          `${coords.latitude}, ${coords.longitude}`,
        );
      } else if (textSearch) {
        await this.model.getDataFromAPI(textSearch);
      } else {
        await this.model.getDataFromAPI();
      }

      // DOMRenderer;
      this.updateHeaderDisplay();
      this.updateCurrentConditionsDisplay();
      this.updateHourlyForecastDisplay();
      this.updateDailyForecast();

      // console.log("data fetched correctly", this.model.currentCity);
    } catch (error) {
      console.log(error);
    }
  }

  async handleLocationRequest() {
    try {
      const userLocation = await this.model.getUserCurrentPosition();

      if (userLocation) {
        this.updateScreenData(userLocation);
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateHeaderDisplay() {
    const resolvedAddress = this.model.getLocationInfo().address;
    const timeZone = this.model.getLocationInfo().timezone;
    const dateFormatted = getCurrentDateFormatted(timeZone);

    this.renderer.displayHeader(resolvedAddress, dateFormatted);
  }

  updateCurrentConditionsDisplay() {
    const data = this.model.getCurrentConditions();

    this.renderer.displayCurrentConditions(data);

    this.renderer.displayCurrentConditionsMoreInfo(data);
  }

  updateHourlyForecastDisplay(day) {
    let data;
    const timeZone = this.model.getLocationInfo().timezone;
    const targetDay = Number(day);
    const currentTime = getCurrentTime(timeZone);
    const formattedCurrentTime = getCurrentTimeFormatted(currentTime);

    if (targetDay === 0 || day === undefined) {
      data = this.model.getHourlyForecast({
        hour: formattedCurrentTime,
      });
    } else {
      data = this.model.getHourlyForecast({
        day: targetDay,
      });
    }

    const arrayCleaned = getHourlyForecastFormatted(data, targetDay, day);

    this.renderer.displayHourlyForecast(arrayCleaned);
  }

  updateDailyForecast() {
    const timeZone = this.model.getLocationInfo().timezone;
    const weekData = this.model.getDailyForecast();

    const weekDaysFormatted = getWeekDaysFormatted(timeZone, weekData);

    this.renderer.displayDailyForecast(weekDaysFormatted, weekData);
  }

  toggleDaySwapState(day) {
    this.renderer.displayDaySwapState(day);
  }
}
