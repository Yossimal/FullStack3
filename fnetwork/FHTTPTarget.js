
export class FHttpTarget {
    path = "/";
    queryPaarams = {};

    constructor(url) {
        this.url = url;
        if(!checkTarget(url)) throw new Error("Invalid target: " + url);
        this.parseUrl();
    }

    parseUrl() {
        const url = this.url;
        const queryParamsIndex = url.indexOf("?");
        if (queryParamsIndex !== -1) {
            this.path = url.slice(0, queryParamsIndex);
            const queryParams = url.slice(queryParamsIndex + 1);
            const queryParamsArray = queryParams.split("&");
            for (let i = 0; i < queryParamsArray.length; i++) {
                const queryParam = queryParamsArray[i];
                const queryParamArray = queryParam.split("=");
                this.queryParams[queryParamArray[0]] = queryParamArray[1];
            }
        } else {
            this.path = url;
        }
    }

}

export function loadTarget(url) {
    return new FHttpTarget(url);
}

export function checkTarget(target) {
    if (target[0] !== "/") return false;
    return true;
}