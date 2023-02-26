import { st } from "./logicalState.js";

export class State extends HTMLElement {
  inner = this.innerHTML;
  state = this.getAttribute("state");
  constructor() {
    super();
    this.updateState();
    document.addEventListener("state-changed", this.updateState, false);
  }
  get state() {
    return this.getAttribute("state");
  }

  set enumeration(value) {
    this.setAttribute("state", value);
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
    try {
      let state = st(this.state);
      let html = "";
      html += this.inner.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, p1) => {
        return state[p1]??`{{${p1}}}`;
      });
    //   this.dispatchEvent(new CustomEvent("state-changed", { detail: this }));
      this.innerHTML = html;
    } catch (e) {}
  };
}
