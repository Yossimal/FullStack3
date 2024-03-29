import { ffetch } from "../../../fajax/ffetch.js";

export default class $ {
  static id(idString) {
    return document.getElementById(idString);
  }

  static get(url) {
    return fetch(url).then((res) => res.text());
  }

  static xmlToJson(xml) {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) {
      // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = $.xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push($.xmlToJson(item));
        }
      }
    }
    return obj;
  }

  static fget(url) {
    return ffetch(url, { method: "GET" });
  }

  static fpost(url, body, data) {
    return ffetch(url, { ...data, body: body, method: "POST" });
  }

  static fput(url, body, data) {
    return ffetch(url, { ...data, body: body, method: "PUT" });
  }

  static fdelete(url, body, data) {
    return ffetch(url, { ...data, body: body, method: "DELETE" });
  }

  static auth(requestBody) {
    return { ...requestBody, auth: { _id: sessionStorage.getItem("auth") } };
  }
}
