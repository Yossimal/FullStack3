import $ from "../../common/common.js";
import { tagNames } from "../tag-names.js";

export class Container extends HTMLElement {
  root = this.getAttribute("root");
  tagName = tagNames.container.name;

  constructor() {
    super();
    this.redirect(this.root);
  }

  redirect = (newRoot) => {
    $.get(newRoot).then((html) => (this.innerHTML = html));
    this.setAttribute("root", newRoot);
    this.root = newRoot;
  };
}
