export class Controller {
  currentCity;
  constructor() {}

  async getDataFromAPI(location) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=LAL2EGUP76W2VR54RY6ZHKY2J`,
      );
      const result = await response.json();
      this.currentCity = result;
    } catch (error) {
      console.error(error);
    }
  }
}
