// Description: Fake DHCP for FNetwork

const FIPs = new Map();

//generate a random IPv4 address
function randmIPv4() {
  let ip = "";
  for (let i = 0; i < 4; i++) {
    ip += Math.floor(Math.random() * 256);
    if (i != 3) ip += ".";
  }
  return ip;
}

export function forwardToFIP(data) {
  const fip = data.destFIP;
  return new Promise((res, rej) => {
    if (!FIPs.get(fip)) rej("FIP not found");
    res(FIPs.get(fip)(data));
  });
}

export function registerFIP(sendFunction, preferedFIP) {
  //if the FIP already exists or not set, generate a new one
  while (!preferedFIP || FIPs[preferedFIP]) {
    preferedFIP = randmIPv4();
  }
  FIPs.set(preferedFIP, sendFunction);
  return preferedFIP;
}

export function unregisterFIP(fip) {
  FIPs.delete[fip];
}
