import  createResponsePacket  from "../fnetwork/packets-schemas/FHTTPResponsePacket.js";

export class Response {
    /**
     * create a new response object
     * @param {Request} request the request packet
     */
  constructor(request) {
    const packet = createResponsePacket(request);
    this.packet = packet;
    this.headers = packet.headers;
    this.type = packet.headers["content-type"];
    this.body = packet.body;
    this.version = packet.version;
    this.destination = `${packet.dstFIP}:${packet.dstPort}`;
    this.source = `${packet.srcFIP}:${packet.srcPort}`;
  }

  /**
   * sebnd the resopnse to the client
   * @param {string} data the data to send to the client
   */
  send(data) {
    this.body = data;
    this.headers["content-length"] = data.length;
    this.headers["content-type"] = "text/html";
    this.statusCode = 200;
    this.sendResponse(this);
  }

  /**
   * send the response to the client and end the connection
   */
  end() {
    this.sendResponse(this);
  }

  /**
   * change the status code of the response
   * @param {number} code the status code to send to the client
   * @returns this (for chaining)
   */
  status(code) {
    this.statusCode = code;
    return this;
  }


  /**
   * send json response to the client
   * @param {any} data the data to send as json
   */
  json(data) {
    this.body = JSON.stringify(data);
    this.headers["content-length"] = this.body.length;
    this.headers["content-type"] = "application/json";
    this.statusCode = 200;
    this.sendResponse(this);
  }

  /**
   * send redirect response to the client
   * @param {string} url the url to redirect to
   */
  redirect(url) {
    this.headers["location"] = url;
    this.statusCode = 302;
    this.sendResponse(this);
  }

  /**
   * send the response to the client
   */
  sendResponse() {
    if(this.locked) throw new Error("Response already sent");
    this.locked = true;
    buildResponsePacket(this);
    if(!this.sender) throw new Error("No sender function");
    this.sender(this.packet);
  }
}

/**
 * generate packet from response object
 * @param {Response} response the response object to build the packet from
 * @returns the packet to send to the client
 */
function buildResponsePacket(response) {
  response.packet.body = response.body;
  response.packet.headers = response.headers;
  response.packet.status = response.statusCode;
  response.packet.version = response.version;
  return response.packet;
}
