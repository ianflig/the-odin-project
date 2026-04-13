export class Controller {
  currentCity;
  constructor() {}

  async getDataFromAPI(location) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=LAL2EGUP76W2VR54RY6ZHKY2J`,
    );
    const result = await response.json();
    this.currentCity = result;
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

  getDailyConditions({ day = 0 } = {}) {
    return this.currentCity.days[day];
  }

  getCurrentConditions() {
    return this.currentCity.currentConditions;
  }

  getHourlyClimate({ hour = 0, day = 0 } = {}) {
    const newArray = structuredClone(this.currentCity);
    const dayToCheck = newArray.days[day];
    const hourToCheck =
      typeof hour === "number"
        ? hour
        : Number(hour.split("").splice(0, 2).join(""));
    const result = dayToCheck.hours.splice(hourToCheck, 24);
    return result;
  }

  getCurrentTime() {
    const timeZone = this.currentCity.timezone;
    const currentTime = new Date()
      .toLocaleTimeString("es-AR", {
        timeZone: timeZone,
        hour: "2-digit",
        minute: "2-digit",
      })
      .split("")
      .splice(0, 5)
      .join("");

    return currentTime;
  }
}
