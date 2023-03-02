import { logicalState } from "../html-tags/logic/logicalState.js";
import $ from "./common.js";

var state = logicalState("isLoggedIn", false);
document.getElementById("swap").onclick = () => {
  state.value = !state.value;
    // const userToAdd = {
    //   userData: {
    //     name : "yosi",
    //     phone: "78942332453",
    //     password: "2134",
    //     email: "itamar.itamar",
    //   },
    // };
    // $.fput("my.awsome.site.com/addUser",userToAdd, {}).then(
    //   (res) => {
    //     console.log(JSON.parse(res));
    //   }
    // );

    // const contactToAdd = {
    //   contactData: {
    //       name : "itamar",
    //       phone: "78942344125",
    //       creatorId: "c63ae3cd-6a13-4192-89f6-2d3b0e6da83f",
    //     },
    //   };
    //   $.fput("my.awsome.site.com/addContact",contactToAdd, {}).then(
    //     (res) => {
    //       console.log(JSON.parse(res));
    //     }
    //   );

    // const contactToAdd = {
    //   contactData: {
    //     _id:"286d94a4-19dd-415d-94ab-da224990d010",
    //     phone: "1234567",
    //     name: "yossi",
    //   },
    // };
    //$.fpost("my.awsome.site.com/updateContact",contactToAdd, {}).then(
    //       (res) => {
    //         console.log(JSON.parse(res));
    //       }
    //     );

    const contactToDel = {
      contactId: "e4f522d0-3409-45fd-a7a2-cec1926434d6",
    };
        $.fdelete("my.awsome.site.com/deleteContact",contactToDel, {}).then(
          (res) => {
            console.log(JSON.parse(res));
          }
        );

  // const loginData = {
  //   userData: {
  //     name: "John Doa",
  //     password: "12345678",
  //   },
  // };
  // $.fpost("my.awsome.site.com/login", loginData, {}).then((res) => {
  //   console.log(JSON.parse(res));
  // });
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
