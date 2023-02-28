import { FHTTPRequestPacket } from "./packets-schemas/FHTTPRequestPacket.js";

class FakeHTTPProtocol {
  constructor() {}
  /**
   * send message to the server and return the response
   * @param {FHTTPRequestPacket} packet the packet to send with the http protocol to the wanted port
   * @returns promise that resolve the response of the server
   */
  send =  async (packet) => {
    return new Promise(async (resolve, reject) => {
      if (!this.handler) reject("No handler set");
      const response = await this.handler(packet);
      resolve(response);
    });
  }

  /**
   * set the handler to handle the request
   * @param {Function} handler the handler to handle the request
   * @returns this (for chaining)
   */
  setHandler(handler) {
    this.handler = handler;
    return this;
  }

  set ip(val) {
    this._ip = val;
  }

  get ip() {
    return this._ip;
  }

  set port(val) {
    this._port = val;
  }

  get port() {
    return this._port;
  }
}

export function fhttp() {
  return new FakeHTTPProtocol();
}
