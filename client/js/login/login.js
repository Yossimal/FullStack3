import $ from "../common/common.js";

$.id("login").onclick = () => {
    const userName = $.id("username").value;
    const password = $.id("password").value;
    const data = {userData: {name: userName, password: password}};
    $.fpost("my.awsome.site.com/login", data, {}).then((res) => {
        const results = JSON.parse(res);
        if(!results.ok){
            window.alert(results.reason)
        }
    });
};