import $ from "../../common/common.js";
import { tagNames } from "../tag-names.js";

export class Container extends HTMLElement {
  root = this.getAttribute("root");
  name = this.getAttribute("name");
  tagName = tagNames.container.name;

  constructor() {
    super();
    this.redirect(this.root);
    if(!window.routers) window.routers = {};
    window.routers[this.name] = this.redirect;
  }

  redirect = (newRoot) => {
    $.get(newRoot).then((html) => (this.innerHTML = html));
    this.setAttribute("root", newRoot);
    this.root = newRoot;
  };
}

/**
 * redirect container to new target
 * @param {string} name the name of the container to redirect
 * @param {string} target the target file to redirect to
 */
export function redirect(name,target){
  window.routers[name](target);
}