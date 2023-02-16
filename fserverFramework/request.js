
export default class Request{

    constructor(packet,route,app){
        this.body = app.parser(packet.body);
        this.headers = packet.headers;
        this.type = packet.headers["content-type"];
        this.method = packet.method;
        this.url = packet.url;
        this.params = getParams(route);
        this.queryParams = getQueryParams(packet.url);
        this.ip = packet.srcFIP;
        this.originalUrl = getOriginalUrl(packet.url);
        this.path = getPath(packet.url);
        this.protocol = "http";
        this.secure = false;
        this.get = (key)=>this.headers[key];
    }
}

function getParams(route){
    const params = {};
    const url = route.split("/");
    const paramsKeys = url.filter((u)=>u.startsWith(":"));
    const paramsValues = url.filter((u)=>!u.startsWith(":"));
    paramsKeys.forEach((k,i)=>params[k] = paramsValues[i]);
    return params;
}

function getQueryParams(url){
    const params = {};
    const query = url.split("?")[1];
    if(!query) return params;
    const queryParams = query.split("&");
    queryParams.forEach((q)=>{
        const [key,value] = q.split("=");
        params[key] = value;
    });
    return params;
}

function getOriginalUrl(url){
    //get the substring after the first / and with it
    return url.substring(url.indexOf("/"));
}

function getPath(url){
    return getOriginalkUrl(url.split("?")[0]);
}