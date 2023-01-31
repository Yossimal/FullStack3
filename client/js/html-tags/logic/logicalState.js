const stateChanged = new Event('state-changed');


export function logicalState(name,initialValue = undefined) {
  return new LogicalState(initialValue,name);
}

export function st(name){
  return window.states[name];
}

class LogicalState {

  constructor(value,name) {
    // this.val = value;
    this.name = name;
    if(!globalThis.states){
      window.states = {};
    }
    window.states[name] = value;
    document.dispatchEvent(stateChanged)
  }

  get value(){
    return window.states[this.name];
  }

  set value(val) {
    window.states[this.name] = val;
    document.dispatchEvent(stateChanged)
  }
}
