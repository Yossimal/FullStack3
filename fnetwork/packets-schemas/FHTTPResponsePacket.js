
class FHTTPResponsePacket{
    constructor(
        request,
        status = 200,
        headers = {},
        body = ""
    ){
        this.status = status;
        this.headers = headers;
        this.body = body;
        this.version = request.version;
        this.srcFIP = request.destFIP;
        this.destFIP = request.srcFIP;
        this.srcPort = request.dstPort;
        this.dstPort = request.srcPort;
    }

    get statusText(){
        return getStatusText(this.status);
    }
}

function getStatusText(status){
    switch(status){
        case 200:
            return "OK";
        case 201:
            return "Created";
        case 202:
            return "Accepted";
        case 204:
            return "No Content";
        case 301:
            return "Moved Permanently";
        case 302:
            return "Found";
        case 304:
            return "Not Modified";
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 403:
            return "Forbidden";
        case 404:
            return "Not Found";
        case 405:
            return "Method Not Allowed";
        case 406:
            return "Not Acceptable";
        case 409:
            return "Conflict";
        case 410:
            return "Gone";
        case 500:
            return "Internal Server Error";
        case 501:
            return "Not Implemented";
        case 502:
            return "Bad Gateway";
        case 503:
            return "Service Unavailable";
        default:
            return "Unknown Status";
    }
}

export default function createResponsePacket(request){
    return new FHTTPResponsePacket(request);
}