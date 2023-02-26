import { ReadyState } from "./ReadyState.js";
import { FDNSRequest } from "../fnetwork/fdns.js";
import {
  createRequestPacket,
  FHTTPRequestPacket,
} from "../fnetwork/packets-schemas/FHTTPRequestPacket.js";
import { forwardToFIP } from "../fnetwork/FDHCP.js";

const HTTP_PORT = 80;

export default class FXMLHttpRequest {
  _readyState = ReadyState.UNSENT;
  _ip = "127.0.0.1";

  /**
   * open the request
   * @param {string} method the http method
   * @param {string} url the url of the request
   */
  open = (method, url) => {
    this.method = method;
    this.url = url;
    this.readyState = ReadyState.OPENED;
  };

  /**
   * get the ready state of the request
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * set the ready state of the request
   */
  set readyState(state) {
    if (this._aborted) return;
    this._readyState = state;
    if (this.onreadystatechange) this.onreadystatechange();
  }

  /**
   * send the request
   * @param {string} body the body of the request
   */
  send = async (body) => {
    this.body = body;
    this.readyState = ReadyState.LOADING;
    const packet = await this._setPacketToSend();
    forwardToFIP(packet).then((response) => {
      this.readyState = ReadyState.HEADERS_RECEIVED;
      this.statusText = response.statusText;
      this.status = response.status;
      this.readyState = ReadyState.LOADING;
      this.response = response.body;
      this.readyState = ReadyState.DONE;
      this.onload();
    });
  };

  /**
   * set the packet to send and return it in a promise
   * @returns {Promise<FHTTPRequestPacket>} the packet to send
   */
  _setPacketToSend = async () => {
    const ip = await getFIPOfURL(this.url.split("/")[0]);
    const packet = createRequestPacket();
    packet.body = this.body;
    packet.method = this.method;
    packet.url = this.url;
    packet.headers = this.headers;
    packet.destFIP = ip;
    packet.destFPort = HTTP_PORT;
    packet.target = calculateTarget(this.url);
    return packet;
  };

  /**
   * abort the request
   */
  abort = () => {
    this.readyState = ReadyState.UNSENT;
    this._aborted = true;
  };

  /**
   * Returns all the response headers, separated by CRLF, as a string, or null if no response has been received.
   * @returns {string} the response headers
   */
  getAllResponseHeaders = () => {
    return this.response.headers
      .map((header) => `${header.key}: ${header.value}`)
      .join("\r\n");
  };

  /**
   * get response header
   * @param {string} key the key of the header
   * @returns the value of the header
   */
  getResponseHeader = (key) => {
    return this.headers[key];
  };

  /**
   * set request header
   * @param {string} key the key of the header
   * @param {string} value the value of the header
   */
  setRequestHeader = (key, value) => {
    this.headers[key] = value;
  };

  /**
   * override the mime type of the response
   * @param {string} mimeType the new mime type of the response
   */
  overrideMimeType = (mimeType) => {
    this.mimeType = mimeType;
  };

  /**
   * set the mime type of the response
   */
  set mimeType(val) {
    if (!this.response) return;
    this.response.headers["content-type"] = val;
  }

  /**
   * get the mime type of the response
   */
  get mimeType() {
    if (!this.response) return undefined;
    return this.response.headers["content-type"];
  }
}

/**
 * get the FIP of the url
 * @param {string} url the url to get the FIP of
 * @returns the FIP of the url
 */
function getFIPOfURL(url) {
  return FDNSRequest(url, {});
}

/**
 * get the target path from the url
 * @param {stirng} url the url to get the target from
 * @returns the target path
 */
function calculateTarget(url) {
  const firstIndex = url.indexOf("/");
  const lastIndex = url.indexOf("?");
  if (url.indexOf("/") === -1) {
    return "/";
  }
  let target;
  if (lastIndex === -1) {
    target = url.substring(firstIndex);
  } else {
    target = url.substring(firstIndex, lastIndex);
  }
  if (target == "") {
    target = "/";
  }
  return target;
}
