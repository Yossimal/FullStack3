import { UrlLoad } from "./me-url.js";
import { tagNames } from "../tag-names.js";
import { EventLitsenerTag } from "./me-event.js";

export function initAsync() {
  customElements.define(tagNames.url.name, UrlLoad);
  customElements.define(tagNames.eventListener.name, EventLitsenerTag);
}