import { frequest } from "../../../server/fdns/fdns.js"

export function ffetch(url,options=null){
    if(options===null){
        options = {method:'GET'}
    }
    return frequest(url,options)
}