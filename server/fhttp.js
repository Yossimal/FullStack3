export function fhttp() {
  return {
    _funcs: {},
    post: (url, func) => this.funcs[url] = {method: "POST", func:func,url: url},
    get: (url, func) => this.funcs[url] = {method: "GET", func:func,url: url},
    put: (url, func) => this.funcs[url] = {method: "PUT", func:func,url: url},
    delete: (url, func) => this.funcs[url] = {method: "DELETE", func:func,url: url},
    listen: (port) => {
      
    }

  };
}
