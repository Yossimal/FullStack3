import { st } from "./logicalState.js";

export class Condition extends HTMLElement {
  constructor() {
    super();
    this.updateState();
    document.addEventListener("state-changed", this.updateState, false);
  }

  makeVisible() {
    this.style.display = "";
  }
  makeInvisible() {
    this.style.display = "none";
  }
  get condition() {
    return this.getAttribute("if");
  }

  updateState = () => {
    try {
      if (eval(this.condition)) {
        this.makeVisible();
      } else {
        this.makeInvisible();
      }
    } catch (e) {}
  };
}