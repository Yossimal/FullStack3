import { Container } from "./Container.js";
import { Redirect } from "./redirect.js";
import { tagNames } from "../tag-names.js";

export function initRouter() {
  //first setup the custom elements
  customElements.define(tagNames.container.name, Container);
  customElements.define(tagNames.redirect.name, Redirect);
}
