
class connectionObject{
    constructor(connectionData){
        if(!connectionData.databases){
            throw new Error("There is no databases attribute in the connection data");
        }else if(!connectionData.connectionString){
            throw new Error("There is no connectionString attribute in the connection data");
        }
        this.connectionString = connectionData.connectionString;
        this.databases = connectionData.databases;
    }

    /**
     * 
     * @param {*} databaseName 
     * @returns 
     */
    db(databaseName){
        const db = this.databases.find(db => db.name === databaseName);
        if(!db){
            throw new Error("Database not found");
        }
        return db;
    }
}

export function connection(connectionData) {
  return new Promise((resolve, reject) => {
    if (!connectionData.databases) {
      reject("There is no databases attribute in the connection data");
    } else if (!connectionData.connectionString) {
      reject("There is no connectionString attribute in the connection data");
    } else {
      resolve({
        connectionString: connectionData.connectionString,
        db: getDatabase
      });
    }
  });
}

function getDatabase(databaseName) {
  return new Promise((resolve, reject) => {
    if (!localStorage.getItem(databaseName)) {
      reject("Database not found");
    }
    resolve(JSON.parse(localStorage.getItem(databaseName)));
  });
}
