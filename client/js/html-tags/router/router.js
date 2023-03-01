import { Container } from "./Container.js";
import { Redirect } from "./redirect.js";
import { tagNames } from "../tag-names.js";
import { Script } from "./script.js";

export function initRouter() {
  //first setup the custom elements
  customElements.define(tagNames.container.name, Container);
  customElements.define(tagNames.redirect.name, Redirect);
  customElements.define(tagNames.script.name, Script);
}
