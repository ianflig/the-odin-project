import { DOMRenderer } from "./DOMRenderer.js";

export class ScreenController {
  constructor(logic) {
    this.controller = logic;
    this.renderer = new DOMRenderer();

    this.btnGPS = document.querySelector("#check-location");

    this.bindEvents();
    this.initiateApp();
  }

  bindEvents() {
    this.btnGPS.addEventListener("click", () => {
      this.handleLocationRequest();
    });
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
}
