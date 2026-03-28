import "./css/styles.css";
import { Storage } from "./js/Storage.js";
import { Controller } from "./js/Controller.js";

const storage = new Storage();
const app = new Controller(storage);

window.app = app;