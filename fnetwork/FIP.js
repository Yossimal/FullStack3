


/**
 * check if the given string is in ipv4 format
 * @param {string} ipAddress the ip address to check
 * @returns is the ip address in ipv4 format
 */
export function checkIpv4(ipAddress){
    if(ipAddress.split(".").length !== 4) return false;
    const ipParts = ipAddress.split(".");
    for(const part of ipParts){
      if(isNaN(part)) return false;
      if(part.length > 3) return false;
      if(part.length < 1) return false;
      if(parseInt(part) == NaN) return false;
      if(parseInt(part) > 255) return false;
      if(parseInt(part) < 0) return false;
    }
    return true;
  
  }