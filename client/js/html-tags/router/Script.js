export class Script extends HTMLElement {
  src = this.getAttribute("src");
  type = this.getAttribute("type");
  constructor() {
    super();
    const scriptTag = document.createElement("script");
    scriptTag.src = this.src;
    scriptTag.type = this.type;
    scriptTag.setAttribute("defer", "");
    this.appendChild(scriptTag);
  }
}

export function registerFunction(name, func) {
  window.functions ??= {};
  window.functions[name] = func;
}