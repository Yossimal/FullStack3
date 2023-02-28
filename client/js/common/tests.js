import { logicalState } from "../html-tags/logic/logicalState.js";
import $ from "./common.js";

var state = logicalState("isLoggedIn", false);
document.getElementById("swap").onclick = () => {
  state.value = !state.value;
  //   const userToAdd = {
  //     userData: {
  //       _id:"9d5212af-4deb-4477-8e5c-fa6cbd536107",
  //       phone: "78942344125",
  //     },
  //   };
  //   $.fpost("my.awsome.site.com/updateUser",userToAdd, {}).then(
  //     (res) => {
  //       console.log(JSON.parse(res));
  //     }
  //   );
  // };

  const loginData = {
    userData: {
      name: "John Doa",
      password: "12345678",
    },
  };
  $.fpost("my.awsome.site.com/login", loginData, {}).then((res) => {
    console.log(JSON.parse(res));
  });
};
const dat = [];

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
