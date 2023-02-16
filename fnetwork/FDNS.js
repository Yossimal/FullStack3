const FURLS = {
  
};

export function registerFURL(furl, fip) {
  FURLS[furl] = fip;
}

export function FDNSRequest(url, options) {
  return new Promise((res, rej) => {
    if (FURLS[url]) {
      res(FURLS[url]);
    } else {
      rej("DNS Error");
    }
  });
}


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
