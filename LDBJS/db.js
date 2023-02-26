import { METADATA_DB } from "./paths";

export class dbObject{
    constructor(name,path){
        this.name = name;
        this.path = path;
        
    }

    
}

export default function db(name,path){
    return new Promise((resolve,reject)=>{
        if(!name){
            reject("Database name is required");
        }else if(!path){
            reject("Database path is required");
        }else{
            resolve(new dbObject(name,path));
        }
    });
}

