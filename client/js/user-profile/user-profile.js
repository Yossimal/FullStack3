import { logicalState, st } from "../html-tags/logic/logicalState.js";
import { registerFunction } from "../html-tags/router/Script.js";
import $ from "../common/common.js";

registerFunction("toggleEdit", toggleEditButton);
registerFunction("editProfile", updateUserProfile);

export function toggleEditButton() {
  const editState = logicalState("isEdit", st("isEdit") ?? false);
  editState.value = !editState.value;
}

export function updateUserProfile() {
  const updatedUser = {};
  updatedUser.name = $.id("userName").value;
  updatedUser.email = $.id("email").value;
  updatedUser.phone = $.id("phone").value;
  updatedUser._id = st("user")._id;

  if ($.id("password").value != "") {
    if ($.id("confirmPassword").value !== $.id("password").value) {
      alert("passwords do not match");
      return;
    }
    updatedUser.password = $.id("password").value;
  }

  const reqBody = {
    userData: updatedUser,
    auth: st("user")._id,
  };

  $.fpost("my.awsome.site.com/updateUser", reqBody).then((results) => {
    const res = JSON.parse(results);
    if (res.ok) {
      alert("user updated");
      toggleEditButton();
      logicalState("user", res.data);
    } else {
      console.log(res);
      alert(res.reason);
    }
  });
}
