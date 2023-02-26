import DataObject from "./dataObject.js";
import { SCHEMA_PATH } from "./paths.js";

export default class SchemaData {
  /**
   * create schema object
   * @param {string} name the name of the schema
   * @param {dbObject} db the database that contains the schema
   */
  constructor(name, db,objectType=DataObject) {
    this.name = name;
    this.path = SCHEMA_PATH(db, name);
    this.objectType = objectType;
  }

  /**
   * retrive data from the database by query
   * @param {any} query query for searching in the database
   * @returns array of all the objects that match the query in the database (Promise)
   */
  find(query) {
    return new Promise((resolve, reject) => {
      if (!this.path) {
        reject("Path is required");
      } else {
        query ??= {};
        const data = JSON.parse(localStorage.getItem(this.path));
        const results = data.filter((item) =>
          Object.keys(query).every((key) => item[key] === query[key])
        );
        resolve(results.map(dat=>new this.objectType(this,dat)));
      }
    });
  }

  /**
   * get all the data from the database
   * @returns the data of the database in array (Promise)
   */
  all() {
    return this.find();
  }

  /**
   * saves array of objects to the database
   * @param {DataObject[]} data array of objects to save
   * @returns the saved objects (Promise)
   */
  saveAll(data) {
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
  remove(query) {
    return new Promise((resolve, reject) => {
      if (!this.path) {
        reject("Path is required");
      } else {
        query ??= {};
        const data = JSON.parse(localStorage.getItem(this.path));
        const count = data.length;
        const newData = data.filter(
          (item) => !Object.keys(query).every((key) => item[key] !== query[key])
        );
        const newCount = newData.length;
        localStorage.setItem(this.path, JSON.stringify(newData));
        resolve(count - newCount);
      }
    });
  }
}


function createSchema(){

}