import $ from "../../common/common.js";

export class UrlLoad extends HTMLElement {
  url = this.getAttribute("url");

  get fajax(){
    return this.getAttribute('fajax') !=null && this.getAttribute('fajax').toLowerCase() === 'true'
  }

  get type() {
    return this.getAttribute("type") == null
      ? "json"
      : this.getAttribute("type").toLowerCase();
  }
  get bslash() {
    return (
      this.getAttribute("bslash") == null ||
      this.getAttribute("bslash").toLowerCase() === "true"
    );
  }
  html = this.innerHTML;
  constructor() {
    super();
    this.url = this.getAttribute("url");
    this.load().then(() =>
      this.dispatchEvent(new CustomEvent("state-changed", { detail: this }))
    );
  }

  load = async () => {
    const data = await $.get(this.url);
    if (this.type === "html") {
      this.innerHTML = data;
      this.html = data;
    }
    // replace the data of html where there is pattern of {{val}} with value of data only if type is json and data[val] is not undefined. parse data from json text. and also check for options like {{val.val}} and {{val.val.val}} also if bslash is true, put backslash before each double quote at the results
    else if (this.type === "json") {
      this.innerHTML = this.html.replace(/{{([^}]+)}}/g, (match, p1) => {
        let val = JSON.parse(data);
        p1.split(".").forEach((v) => {
          val = val[v];
        });
        let ret = JSON.stringify(val);
        if(!ret){
            return `{{${p1}}}`;
        }
        if (this.bslash) {
           ret = ret.replace(/\"/g, '&quot;');
        }
        return ret;
      });
    }

    // if (this.type === "json") {
    //   this.innerHTML = this.html.replace(/{{([^}]+)}}/g, (match, p1) => {
    //     let val = JSON.parse(data);
    //     p1.split(".").forEach((v) => {
    //       val = val[v];
    //     });
    //     let ret = JSON.stringify(val);
    //     if(this.bslash){
    //         ret = ret.replace(/\"/g, "\\\"");
    //     }
    //     return ret;
    //   });
    // }

    // replace the data of html where there is pattern of {{val}} with value of data only if type is xml and data[val] is not undefined also check for options like {{val.val}} and {{val.val.val}}. when data is in xml structure
    if (this.type === "xml") {
      this.innerHTML = this.html.replace(/{{([^}]+)}}/g, (match, p1) => {
        let val = JSON.parse($.xmlToJson(data));
        p1.split(".").forEach((v) => {
          val = val[v];
        });
        return val;
      });
    }
  };
}
