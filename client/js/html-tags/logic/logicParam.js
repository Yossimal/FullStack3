
function logicParam(name,initialValue = undefined) {
  return new LogicParam(name,initialValue);
}

class LogicParam{
    constructor(name,initialValue){
        this.name = name;
        if(!window.logicParams){
            window.logicParams = {};
        }
        window.logicParams[name] = initialValue;
    }
}