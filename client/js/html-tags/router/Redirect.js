import { Container, redirect } from "./Container.js";
import $ from "../../common/common.js";
import { tagNames } from "../tag-names.js";

export class Redirect extends HTMLElement {
  parentContainer;
  href = this.getAttribute("href");
  type = this.getAttribute("type");
  target = this.getAttribute("target");
  html = this.innerHTML;

  constructor() {
    super();
    this.innerHTML = "";
    //setup the element
    if (this.type.toLowerCase() === "button") {
      this.element = document.createElement("button");
    } else if (this.type.toLowerCase() === "a") {
      this.element = document.createElement("a");
      this.element.removeAttribute("type");
      this.element.setAttribute("href", "#");
    }

    this.element.onclick = this.onclick;
    if (this.className) {
      this.element.className = this.className;
    }
    this.element.innerHTML = this.html;
    this.className = "me-redirect";
    this.appendChild(this.element);

    let parentContainer = this.parentElement;
    while (parentContainer.tagName != tagNames.container.name) {
      parentContainer = parentContainer.parentElement;
    }
    this.parentContainer = parentContainer;
  }

  onclick = () => {
    if (!this.target) {
      this.parentContainer.redirect(this.href);
    } else {
      redirect(this.target, this.href);
    }
  };
}
