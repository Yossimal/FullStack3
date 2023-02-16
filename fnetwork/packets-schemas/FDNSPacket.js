
/**
 * 
 * @param {string} data the data to send with the packet
 * @param {"REGISTER" | "REQUEST"} requestOption the fdns request option
 */
export default function fdnsPacket(data,requestOption){
    return {
        type:"FDNS",
        data:data,
        requestOption:requestOption
    }
}