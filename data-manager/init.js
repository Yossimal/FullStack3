import ldbjs from "../LDBJS/ldb.js";

export var ldb;

const connectionString = "type:local$user:amazingUser";

export function initDatabase() {
  ldbjs.connect(connectionString);
}
