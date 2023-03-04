import { initLogic } from "./logic/logic.js";
import { initRouter } from "./router/router.js";
import { initAsync } from "./async/async.js";

export var debug = false;

initRouter();
initLogic();
initAsync();