import "./css/styles.css";
import { Controller } from "./models/WeatherModel.js";
import { DOMRenderer } from "./ui/DOMRenderer.js";
import { ScreenController } from "./controllers/ScreenController.js";

const controller = new Controller();
const renderer = new DOMRenderer();
const screen = new ScreenController(controller, renderer);

window.app = screen;
