import { METADATA_BASE_PATH,METADATA_DB } from "./paths.js";
import { dbObject } from "./db.js";

class LDB {
  connect(connectionString) {
    return new Promise((resolve, reject) => {
      const metadataPath = `${METADATA_BASE_PATH}:${connectionString}`;
      if (!localStorage.getItem(metadataPath)) {
        reject("Database not found. Check your connection string");
      }
      resolve(JSON.parse(localStorage.getItem(metadataPath)));
    });
  }

  createDatabase(name) {
    return new Promise((resolve, reject) => {
      if (!name) {
        reject("Database name is required");
      } else {
        const ret = new dbObject(name, METADATA_DB(name));
        resolve();
      }
    });
  }
}

/**
 * connect to locale database
 * @param {string} connectionString the connection string to the locale database
 * @returns connection object to the locale database
 */
export default function ldb(connectionString) {
  return new LDB(connectionString);
}
