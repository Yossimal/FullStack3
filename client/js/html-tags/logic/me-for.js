import { st } from "./logicalState.js";

export class Loop extends HTMLElement {
  inner = this.innerHTML;
  constructor() {
    super();
    this.updateState();
    document.addEventListener("state-changed", this.updateState, false);
  }
  get enumeration() {
    return this.getAttribute("for");
  }

  set enumeration(value) {
    this.setAttribute("for", value);
  }

  set inner(value) {
    this.inner = value;
  }

  get json() {
    return (
      this.getAttribute("json") != null &&
      this.getAttribute("json").toLowerCase() === "true"
    );
  }

  set json(value) {
    if (value) {
      this.setAttribute("json", "true");
    } else {
      this.removeAttribute("json");
    }
  }

  updateState = () => {
    let arr = eval(this.enumeration);
    if (!arr || arr.length === 0) {
      this.innerHTML = "";
      return;
    }
    if (this.json) {
      arr = JSON.parse(arr);
    }
    let html = "";
    for (let prop of arr) {
      //replace each pattern in this.inner which look like {{prop}} with the value of prop
      html += this.inner.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, p1) => {
        return prop[p1];
      });
      this.dispatchEvent(new CustomEvent("state-changed", { detail: this }));
    }
    this.innerHTML = html;
  };
}
