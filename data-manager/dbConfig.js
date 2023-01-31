let dbConfig = {
    dbName : "db"
}

export default function config(configuration={}){
   dbConfig = {...dbConfig,...configuration} 
   return dbConfig;
}