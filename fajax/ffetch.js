import FXMLHttpRequest from "./FXMLHttpRequest.js";

export function ffetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const fxhr = new FXMLHttpRequest();
    fxhr.open(options.method || "GET", url);
    fxhr.onload = () => {
      if (fxhr.status !== 200) {
        reject({
          reason: "Bad Status Code",
          status: { code: fxhr.status, text: fxhr.statusText },
          packet: fxhr.packet,
        });
      } else {
        resolve(fxhr.response);
      }
    };
    fxhr.send(JSON.stringify(options.body));
  });
}
