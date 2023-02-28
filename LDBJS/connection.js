

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
