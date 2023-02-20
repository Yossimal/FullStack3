import { fhttp } from "../fnetwork/FHTTP.js";
import { registerFURL } from "../fnetwork/fdns.js";
import { registerFIP } from "../fnetwork/FDHCP.js";
import fakeHttp from "./fakeHttp.js";



export function fnet(url){
    const httpProtocol = fhttp();
    const ip = registerFIP(httpProtocol.send);
    httpProtocol.ip = ip;
    registerFURL(url, ip);
    const fhttpObject = fakeHttp(ip);
    fhttpObject.http(httpProtocol)
    return fhttpObject
}