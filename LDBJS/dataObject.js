import DataObject from "./dataObject.js";
import { SCHEMA_PATH } from "./paths.js";
import ldbjs from "./ldb.js";

export default class SchemaData {
  /**
   * the database that the schema uses
   */
  static get _connectionString() {
    return ldbjs.connectionPath;
  }
  /**
   * the name of the schema (for saving the schema to the right path)
   */
  static get _name() {
    return null;
  }
  /**
   * the path of the saved schema
   */
  static get _path() {
    return SCHEMA_PATH(this._connectionString, this._name);
  }

  /**
   * create new data object with the given data
   * @param {any} data the data of the object
   */
  constructor(data) {
    for (let i in data) {
      this[i] = data[i];
    }
    if (!this._id) {
      this._id = crypto.randomUUID();
    }
  }
  /**
   * save the object to the database
   * @returns the saved data (Promise)
   */
  save() {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(localStorage.getItem(this.constructor._path));

      const toAdd = this.constructor._schema.reduce(
        (prev, cur) => ({ ...prev, [cur]: this[cur] }),
        {}
      );

      localStorage.setItem(
        this.constructor._path,
        JSON.stringify({ ...data, [this._id]: toAdd })
      );
      resolve(toAdd);
    });
  }

  /**
   * retrive data from the database by query
   * @param {any} query query for searching in the database
   * @returns array of all the objects that match the query in the database (Promise)
   */
  static find(query) {
    return new Promise((resolve, reject) => {
      query ??= {};
      const data = JSON.parse(localStorage.getItem(this._path)) ?? {};
      const arrData = Object.keys(data).map((key) => ({ ...data[key] })) ?? [];
      const results = arrData.filter((item) =>
        Object.keys(query).every((key) => item[key] === query[key])
      );
      resolve(results.map((dat) => new this(dat)));
    });
  }

  /**
   * get all the data from the database
   * @returns the data of the database in array (Promise)
   */
  static all() {
    return this.find();
  }

  /**
   * saves array of objects to the database
   * @param {DataObject[]} data array of objects to save
   * @returns the saved objects (Promise)
   */
  static saveAll(data) {
    return new Promise((resolve, reject) => {
      if (!this.path) {
        reject("Path is required");
      } else if (!Array.isArray(data)) {
        reject("Data must be an array. Use save() to save a single item");
      } else {
        const results = [];
        Promise.all(
          data.forEach(async (item) =>
            item
              .save()
              .then((result) => results.push(result))
              .catch((err) => reject(err))
          )
        ).then(() => resolve(results));
      }
    });
  }

  /**
   * removes data from the database that matches the query
   * @param {any} query the query of the data to be removed
   * @returns the amount of data that have been removed (Promise)
   */
  static remove(query) {
    return new Promise((resolve, reject) => {
      if (!this._path) {
        reject("Path is required");
      } else {
        query ??= {};
        const data = JSON.parse(localStorage.getItem(this._path));
        //convert the object to array for filtering
        const dataArr = Object.keys(data).map((key) => ({ ...data[key] }));
        const count = dataArr.length;
        //remove all the data that matches the query
        const newData = dataArr.filter(
          (item) => Object.keys(query).every((key) => item[key] !== query[key])
        );
        const newCount = newData.length;
        //convert the array to object for saving
        const newDataObj = newData.reduce(
          (prev, cur) => ({ ...prev, [cur._id]: cur }),
          {}
        );
        localStorage.setItem(this._path, JSON.stringify(newDataObj));
        resolve(count - newCount);
      }
    });
  }

  /**
   * get schema for that document
   * @returns the schema of the database (Array of all names of parameters)
   */
  static get _schema() {
    return ["_id"];
  }
}
