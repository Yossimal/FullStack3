export const LDB_BASE_PATH = "ldbdata";
export const METADATA_BASE_PATH = `${LDB_BASE_PATH}:connection`;
/**
 * get the metadata of the database
 * @param {string} dbName the name of the db
 * @param {connectionObject} connection the connection to the ldb
 * @returns the path for the metadata of the database
 */
export const METADATA_DB = (dbName, connection) =>
  `${METADATA_BASE_PATH}:${connection.connectionString}:${dbName}`;
/**
 * gets the path for the data in the schema
 * @param {dbObject} db the database that contains the schema
 * @param {string} schemaName the name of the schema
 * @returns the path of the data in the schema
 */
export const SCHEMA_PATH = (db, schemaName) =>
  `${METADATA_DB(db.name, db.connection)}:schema:${schemaName}`;
