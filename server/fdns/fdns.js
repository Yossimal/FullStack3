const notFoundRedirect = "www.url.not.found.fcom";

const fdns = {
  "www.url.not.found.fcom": {
    executor: (path, params, options) => {
      return "404 cant find url";
    },
  },
};

export function frequest(url, options) {
  if (fdns[url.split("/")]) {
    url = notFoundRedirect;
    options = { method: "GET" };
  }
  return new Promise(
    (res) =>
      fdns[url.split("/")].executor(
        url.split("/")[0],
        url.slice(
          url.indexOf("/"),
          url.indexOf("?") !== -1 ? url.indexOf("?") : null
        ),
        options
      ),
    (rej) => "DNS Error"
  );
}
