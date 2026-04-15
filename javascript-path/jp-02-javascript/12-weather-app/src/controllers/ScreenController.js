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
      this.renderer.displaySkeleton();

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
      this.updateDailyForecast();

      // console.log("data fetched correctly", this.controller.currentCity);
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
    const timeZone = this.controller.currentCity.timezone;
    const dateFormatted = this.renderer.getCurrentDateFormatted(timeZone);

    this.renderer.displayHeader(resolvedAddress, dateFormatted);
  }

  updateCurrentConditionsDisplay() {
    const data = this.controller.currentCity.currentConditions;

    this.renderer.displayCurrentConditions(data);

    this.renderer.displayCurrentConditionsMoreInfo(data);
  }

  updateHourlyForecastDisplay(day) {
    let data;
    const timeZone = this.controller.currentCity.timezone;
    const targetDay = Number(day);
    const currentTime = this.renderer.getCurrentTime(timeZone);
    const formattedCurrentTime =
      this.renderer.getCurrentTimeFormatted(currentTime);

    if (targetDay === 0 || day === undefined) {
      data = this.controller.getHourlyForecast({
        hour: formattedCurrentTime,
      });
    } else {
      data = this.controller.getHourlyForecast({
        day: targetDay,
      });
    }

    const arrayCleaned = this.renderer.getHourlyForecastFormatted(
      data,
      targetDay,
      day,
    );

    this.renderer.displayHourlyForecast(arrayCleaned);
  }

  updateDailyForecast() {
    const timeZone = this.controller.currentCity.timeZone;
    const daysArray = this.controller.currentCity.days;

    const weekDaysFormatted = this.renderer.getWeekDaysFormatted(
      timeZone,
      daysArray,
    );
    const weekData = this.controller.getDailyForecast();

    this.renderer.displayDailyForecast(weekDaysFormatted, weekData);
  }

  toggleDaySwapState(day) {
    this.renderer.displayDaySwapState(day);
  }
}
