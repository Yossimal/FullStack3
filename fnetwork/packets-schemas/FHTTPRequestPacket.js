import { checkIpv4 } from "./FIP.js";
import { checkPort } from "../FPORT.js";
import { checkTarget } from "../FHTTPPacket.js";

export const HTTPMethods = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
  FETCH: "FETCH",
};

export class FHTTPRequestPacket {
  srcFIP;
  destFIP;
  method;
  target = "/";
  headers;
  body;
  srcPort;
  dstPort;
  version;
  constructor(
    srcFIP = "",
    destFIP = "",
    method = "GET",
    headers = {},
    body = null,
    srcPort = "",
    dstPort = "",
    version = "HTTP/1.1",
    target = "/"
  ) {
    this.srcFIP = srcFIP;
    this.destFIP = destFIP;
    if (!HTTPMethods[method]) throw new Error("Invalid method: " + method);
    this.method = method;
    this.target = target;
    this.headers = headers;
    this.body = body;
    this.srcPort = srcPort;
    this.dstPort = dstPort;
    this.version = version;
  }

  validate() {
    if (!checkIpv4(this.srcFIP)) return false;
    if (!checkIpv4(this.destFIP)) return false;
    if (!checkPort(this.srcPort)) return false;
    if (!checkPort(this.dstPort)) return false;
    if (!HTTPMethods[this.method]) return false;
    if (this.headers["Content-Length"]) {
      if (this.body.length !== parseInt(this.headers["Content-Length"]))
        return false;
    } else if (this.body) {
      return false;
    }
    if (this.version !== "HTTP/1.1") return false;
    if (!checkTarget(this.target)) return false;
    if ([HTTPMethods.GET,HTTPMethods.DELETE,HTTPMethods.FETCH].includes(this.method) && this.body) return false;
    if ([HTTPMethods.POST,HTTPMethods.PUT].includes(this.method) === "POST" && !this.body) return false;
    return true;
  }
}

export function createRequestPacket() {
  return new FHTTPRequestPacket();
}
