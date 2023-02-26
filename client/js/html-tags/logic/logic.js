import { tagNames } from "../tag-names.js";
import { Condition } from "./me-if.js";
import { Loop } from "./me-for.js";
import { State } from "./me-state.js";

export function initLogic() {
  customElements.define(tagNames.condition.name, Condition);
  customElements.define(tagNames.loop.name, Loop);
  customElements.define(tagNames.state.name, State);
}
