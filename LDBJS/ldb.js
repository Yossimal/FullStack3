import { DB_PATH } from "./paths.js";

export default class ldbjs {
  static connectionPath = null;

  /**
   * connect to the locale database
   * @param {string} connectionString the connection string to the locale database
   * @returns connection object to the locale database
   */
  static connect(connectionString) {
    return new Promise((resolve, reject) => {
      this.connectionPath = DB_PATH(connectionString);
      resolve(this.connectionPath);
    });
  }
}
