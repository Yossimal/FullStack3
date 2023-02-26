import { logicalState } from "../html-tags/logic/logicalState.js";
import $ from "./common.js";

var state = logicalState("isLoggedIn", false);
document.getElementById("swap").onclick = () => {
  state.value = !state.value;
};
const dat = [];
// setInterval(() => {
//   dat.push({val:Math.random() * 100});
//   document.dispatchEvent(new CustomEvent("on-time", {detail:{data:dat}}));
// }, 2000);

var calculation = logicalState("calc");

$.id("calculate").onclick = () => {
  const x = Number($.id("x").value);
  const y = Number($.id("y").value);
  $.fpost(`my.awsome.site.com/calc`, { x: x, y: y })
    .then((sol) => {
      calculation.value = JSON.parse(sol);
    })
    .catch((e) => {
      console.log(e);
      throw new Error(`${e.status.code} ${e.status.text}`);
    });
};
