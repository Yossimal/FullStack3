export class EventLitsenerTag extends HTMLElement {
  eventName = this.getAttribute("event");
  html = this.innerHTML;
  constructor() {
    super();
    document.addEventListener(this.eventName, (data) => this.onEventInvoked(data));
    this.innerHTML = "";
  }
  onEventInvoked(data) {
    // console.log(data.detail);
    // replace the data of html where there is pattern of {{val}} with value of data only if data[val] is not undefined. and also check for options like {{val.val}} and {{val.val.val}} also replace " with &quot;
    this.innerHTML = this.html.replace(/{{([^}]+)}}/g, (match, p1) => {
        let val = data.detail;
        p1.split(".").forEach((v) => {
            val = val[v];
        });
        let ret = JSON.stringify(val);
        if(!ret){
            return `{{${p1}}}`;
        }
        ret = ret.replace(/\"/g, '&quot;');
        console.log(ret)
        return ret;
        });
  }
}
