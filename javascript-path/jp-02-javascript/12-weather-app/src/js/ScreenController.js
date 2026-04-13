export class ScreenController {
  constructor(logic) {
    this.controller = logic;

    this.initiateApp();
  }

  async initiateApp() {
    try {
      const permissions = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permissions.state === "granted") {
        const userLocation = await this.controller.getUserCurrentPosition();
        await this.updateScreenData(
          `${userLocation.latitude}, ${userLocation.longitude}`,
        );
      } else if (permissions.state === "denied") {
        await this.controller.getDataFromAPI();
        await this.updateScreenData();
      } else if (permissions.state === "prompt") {
        await this.controller.getDataFromAPI();
        try {
          const result = await this.controller.getUserCurrentPosition();
          await this.updateScreenData(
            `${result.latitude}, ${result.longitude}`,
          );
        } catch (rejectionError) {
          console.log(rejectionError);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateScreenData(coords = null) {
    try {
      if (coords) {
        await this.controller.getDataFromAPI(
          `${coords.latitude}, ${coords.longitude}`,
        );
      } else {
        await this.controller.getDataFromAPI();
      }

      // DOMRenderer -> renderAll();

      console.log("data fetched correctly", this.controller.currentCity);
    } catch (error) {
      console.log(error);
    }
  }
}
