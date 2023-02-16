import { checkIpv4 } from "../fnetwork/FIP.js";
import { HTTPMethods } from "../fnetwork/packets-schemas/FHTTPRequestPacket.js";

class fakeHttpObj {
  methods = {
    get: { method: HTTPMethods.GET ,targets:[]},
    post: { method: HTTPMethods.POST ,targets:[]},
    put: { method: HTTPMethods.PUT ,targets:[]},
    fetch: { method: HTTPMethods.FETCH ,targets:[]},
    delete: { method: HTTPMethods.DELETE ,targets:[]},
  };

  constructor(ip) {
    this.ip = ip;
    this.litseners = [];
  }

  litsen = (port) => {
    const eventName = `litsener-${this.ip}:${port}`;
    this.litseners.push(eventName);
    addEventListener(eventName, this.route);
  };

  terminate = () => {
    this.litseners.forEach((l) => removeEventListener(l));
  };

  route = (packet) => {};

  json = () => this.parser = JSON.parse;

  text = () => this.parser = (text) => text;

  get = (url, func) => this.methods.get.targets.push({url,func});

  post = (url, func) => this.methods.post.targets.push({url,func});

  put = (url, func) => this.methods.put.targets.push({url,func});

  fetch = (url, func) => this.methods.fetch.targets.push({url,func});

  delete = (url, func) => this.methods.delete.targets.push({url,func});



}

export default function fakeHttp(ip) {
  if (!checkIpv4(ip)) return null;
  return new fakeHttpObj(ip);
}
