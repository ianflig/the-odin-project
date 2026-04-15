import "./css/styles.css";
import { WeatherModel } from "./models/WeatherModel.js";
import { DOMRenderer } from "./ui/DOMRenderer.js";
import { ScreenController } from "./controllers/ScreenController.js";

const model = new WeatherModel();
const renderer = new DOMRenderer();
const screen = new ScreenController(model, renderer);

window.app = screen;
