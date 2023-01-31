import { logicalState } from "../html-tags/logic/logicalState.js";

var state = logicalState("isLoggedIn", false);
document.getElementById("swap").onclick = () => {
  state.value = !state.value;
};
const dat = [];
// setInterval(() => {
//   dat.push({val:Math.random() * 100});
//   document.dispatchEvent(new CustomEvent("on-time", {detail:{data:dat}}));
// }, 2000);

var arr = logicalState("arr", [
  { val: 1 },
  { val: 2 },
  { val: 3 },
  { val: 4 },
  { val: 5 },
  { val: 6 },
]);
