import FXMLHttpRequest from "./FXMLHttpRequest.js";

export function ffetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const fxhr = new FXMLHttpRequest();
    fxhr.open(options.method || "GET", url);
    fxhr.onload = () => resolve(fxhr.response);
    fxhr.send(options.body);
  });
}
