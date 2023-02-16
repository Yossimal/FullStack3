import Request from "./request.js"
import Response from "./response.js"

export function communicationMethod(url,func,packet,app,method){
    return () => {
        const request = new Request(url,packet,app);
        request.method = method;
        const response = new Response(request);
        func(request,response);
    }
}