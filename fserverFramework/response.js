import {createResponsePacket} from '../fnetwork/packets-schemas/FHTTPResponsePacket.js';


export default class Response{

    constructor(request){
        const packet = createResponsePacket(request);
        this.packet = packet;
        this.headers = packet.headers;
        this.type = packet.headers["content-type"];
        this.status = packet.status;
        this.body = packet.body;
        this.version = packet.version;
        this.destination = `${packet.dstFIP}:${packet.dstPort}`;
        this.source = `${packet.srcFIP}:${packet.srcPort}`;

    }

    send(data){
        this.body = data;
        this.headers["content-length"] = data.length;
        this.headers["content-type"] = "text/html";
        this.status = 200;
        sendResponse(this);
    }

    end(){
        sendResponse(this);
    }

    status(code){
        this.status = code;
    }

    json(data){
        this.body = JSON.stringify(data);
        this.headers["content-length"] = this.body.length;
        this.headers["content-type"] = "application/json";
        this.status = 200;
        sendResponse(this);
    }

    redirect(url){
        this.headers["location"] = url;
        this.status = 302;
        sendResponse(this);
    }
}

function sendResponse(response){

}