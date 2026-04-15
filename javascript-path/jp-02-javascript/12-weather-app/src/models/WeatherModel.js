export class WeatherModel {
  currentCity;
  constructor() {}

  async getDataFromAPI(location) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=LAL2EGUP76W2VR54RY6ZHKY2J`,
    );
    const result = await response.json();
    this.currentCity = result;

    const cityName = await this.getCityName(
      this.getLocationInfo().lat,
      this.getLocationInfo().long,
    );
    result.resolvedAddress = cityName;
  }

  async getUserCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error("Rejected by user", error));
        },
      );
    });
  }

  async getCityName(latitude, longitude) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
      );
      const data = await response.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state;
      const country = data.address.country;

      return `${city}, ${country}`;
    } catch (error) {
      console.log(error);
      return "Local";
    }
  }
  _mapLocationInfo(rawJson) {
    return {
      address: rawJson.resolvedAddress,
      timezone: rawJson.timezone,
      lat: rawJson.latitude,
      long: rawJson.longitude,
    };
  }

  _mapDailyForecast(rawJson) {
    return rawJson.map((ele) => ({
      datetimeEpoch: ele.datetimeEpoch,
      icon: ele.icon,
      tempmin: ele.tempmin,
      tempmax: ele.tempmax,
    }));
  }

  _mapCurrentConditions(rawJson) {
    return {
      temperature: rawJson.temp,
      icon: rawJson.icon,
      conditions: rawJson.conditions,
      feelslike: rawJson.feelslike,
      sunrise: rawJson.sunrise,
      sunset: rawJson.sunset,
      uvindex: rawJson.uvindex,
      humidity: rawJson.humidity,
      windspeed: rawJson.windspeed,
      visibility: rawJson.visibility,
      cloudcover: rawJson.cloudcover,
    };
  }

  _mapHourlyForecast(rawJson) {
    return rawJson.map((ele) => ({
      datetime: ele.datetime,
      icon: ele.icon,
      temperature: ele.temp,
    }));
  }

  getLocationInfo() {
    return this._mapLocationInfo(this.currentCity);
  }

  getDailyForecast() {
    const days = this.currentCity.days.slice(0, 7);
    return this._mapDailyForecast(days);
  }

  getCurrentConditions() {
    return this._mapCurrentConditions(this.currentCity.currentConditions);
  }

  getHourlyForecast({ hour = 0, day = 0 } = {}) {
    const dayToCheck = this.currentCity.days[day];
    const rawHoursChunk = dayToCheck.hours.slice(hour);
    return this._mapHourlyForecast(rawHoursChunk);
  }
}
