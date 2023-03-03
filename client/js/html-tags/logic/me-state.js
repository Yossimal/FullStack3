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

  set inner(value) {
    this.inner = value;
  }

  updateState = () => {
    let state = st(this.state);
    if(state==null) return;
    let html = "";
    html += this.inner.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, p1) => {
      return state[p1] ?? `{{${p1}}}`;
    });
    this.innerHTML = html;
  };
}
