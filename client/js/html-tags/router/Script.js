export class Script extends HTMLElement {
  src = this.getAttribute("src");
  onload = this.getAttribute("onload");
  type = this.getAttribute("type");
  constructor() {
    super();
    const scriptTag = document.createElement("script");
    scriptTag.src = this.src;
    scriptTag.type = this.type;
    scriptTag.setAttribute("defer", "");
    scriptTag.onload = () => {
      eval(this.onload);
    };
    this.appendChild(scriptTag);
  }
}

export function registerFunction(name, func) {
  window.functions ??= {};
  window.functions[name] = func;
}
