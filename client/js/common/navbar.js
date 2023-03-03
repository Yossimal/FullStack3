import { logicalState } from "../html-tags/logic/logicalState.js";
import { registerFunction } from "../html-tags/router/Script.js";

registerFunction("logOut", logOut);

export function logOut() {
  logicalState("user", null);
  logicalState("contacts", null);
  logicalState("current-contact", null);
}
