
export function checkPort(portString){
    //check if the given string is in port format
    const port = parseInt(portString);
    if(port == NaN) return false;
    if(port > 65535||port<0) return false;
    return true;
}