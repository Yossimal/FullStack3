import { checkIpv4 } from "../fnetwork/FIP.js";
import {
  FHTTPRequestPacket,
  HTTPMethods,
} from "../fnetwork/packets-schemas/FHTTPRequestPacket.js";
import { fhttp } from "../fnetwork/FHTTP.js";
import { Response } from "./response.js";
import Request from "./request.js";

class fakeHttpObj {
  methods = {
    get: { method: HTTPMethods.GET, targets: [] },
    post: { method: HTTPMethods.POST, targets: [] },
    put: { method: HTTPMethods.PUT, targets: [] },
    fetch: { method: HTTPMethods.FETCH, targets: [] },
    delete: { method: HTTPMethods.DELETE, targets: [] },
  };

  constructor(ip) {
    this.ip = ip;
  }

  /**
   * sets the fake protocol for the framework
   * @param {FakeHTTPProtocol} protocol the objet of the fake protocol
   * @returns this (for chaining)
   */
  http = (protocol) => {
    this.fhttp = protocol;
    this.fhttp.setHandler(this.litsener);
  };

  litsen = (port) => {
    this.port = port;
  };

  litsener = (packet) => {
    if (!this.port) return;
    if (packet.destFIP !== this.ip) return;
    if (packet.destFPort !== this.port) return;
    return this.route(packet);
  };

  terminate = () => {
    this.litseners = [];
  };

  /**
   * get the request packet and route it in the server and retrive the response from the route
   * @param {FHTTPRequestPacket} packet the request packet
   * @returns the response packet
   */
  route = (packet) => {
    const request = new Request(packet, this.fhttp.url, this);
    const method = this.methods[request.method.toLowerCase()];
    const target = request.target;
    const targetFunc = method.targets.find((t) => t.url === target);
    if (targetFunc) {
      const resopnse = new Response(request);
      let results;
      resopnse.sender = (packet) => (results = packet);
      targetFunc.func(request, resopnse);
      return results;
    } else {
      let results;
      const response = new Response(request).status(404);
      response.sender = (packet) => (results = packet);
      response.end();
      return results;
    }
  };

  json = () => (this.parser = JSON.parse);

  text = () => (this.parser = (text) => text);

  get = (url, func) => this.methods.get.targets.push({ url, func });

  post = (url, func) => this.methods.post.targets.push({ url, func });

  put = (url, func) => this.methods.put.targets.push({ url, func });

  fetch = (url, func) => this.methods.fetch.targets.push({ url, func });

  delete = (url, func) => this.methods.delete.targets.push({ url, func });
}

export default function fakeHttp(ip) {
  if (!checkIpv4(ip)) return null;

  return new fakeHttpObj(ip);
}
