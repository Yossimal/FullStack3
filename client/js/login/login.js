import $ from "../common/common.js";
import { redirect } from "../html-tags/router/Container.js";
import { logicalState } from "../html-tags/logic/logicalState.js";
import { registerFunction } from "../html-tags/router/Script.js";

registerFunction("login", login);

export function login() {
  const userName = $.id("username").value;
  const password = $.id("password").value;
  const data = { userData: { name: userName, password: password } };
  $.fpost("my.awsome.site.com/login", data, {}).then((res) => {
    const results = JSON.parse(res);
    if (!results.ok) {
      window.alert(results.reason);
    } else {
      logicalState("user", results.data);
      $.fget(
        `my.awsome.site.com/savedMeContacts?myPhone=${results.data.phone}`
      ).then((res) => {
        logicalState("saved-me", JSON.parse(res).data);
        redirect("main", "html/home/home.html");
      });
    }
  });
}
