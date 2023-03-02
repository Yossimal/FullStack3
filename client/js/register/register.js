import $ from "../common/common.js";
import { redirect } from "../html-tags/router/Container.js";
import { registerFunction } from "../html-tags/router/Script.js";

registerFunction("register", register)

export function register(){
  if (!checkUserData()) {
    return;
  }
  const userName = $.id("username").value;
  const password = $.id("password").value;
  const confirmPassword = $.id("confirmPassword").value;
  const email = $.id("email").value;
  const phone = $.id("phone").value;
  const data = {
    userData: {
      name: userName,
      password: password,
      email: email,
      phone: phone,
    },
  };
  $.fput("my.awsome.site.com/addUser", data, {}).then((res) => {
    const results = JSON.parse(res);
    if (!results.ok) {
      window.alert(results.reason);
    } else {
      alert("User added successfully");
      redirect("main", "html/login/login.html");
    }
  });
};

function checkUserData() {
  const userName = $.id("username").value;
  const password = $.id("password").value;
  const confirmPassword = $.id("confirmPassword").value;
  const email = $.id("email").value;
  const phone = $.id("phone").value;
  if (userName.length < 4) {
    window.alert("username must be at least 4 characters long");
    return false;
  }
  if (password.length < 4) {
    window.alert("password must be at least 4 characters long");
    return false;
  }
  if (password !== confirmPassword) {
    window.alert("passwords don't match");
    return false;
  }
  if (!checkEmail()) {
    return false;
  }
  if (!checkPhoneNumber()) {
    return false;
  }
  return true;
}

function checkEmail() {
  var email = document.getElementById("email");
  var filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email.value)) {
    alert("Please provide a valid email address");
    email.focus;
    return false;
  }
  return true;
}

function checkPhoneNumber() {
  var phone = document.getElementById("phone");
  var filter = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  if (!filter.test(phone.value)) {
    alert("Please provide a valid phone number");
    phone.focus;
    return false;
  }
  return true;
}
