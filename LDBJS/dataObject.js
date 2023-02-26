export default class DataObject {
  constructor(schema, data) {
    this.schema = schema;
    this.data = data;
    if (!this.data._id) {
      this.data._id = crypto.randomUUID();
    }
  }
  /**
   * save the object to the database
   * @returns the saved data (Promise)
   */
  save() {
    return new Promise((resolve, reject) => {
      if (!this.schema) {
        reject("Schema is required");
      } else if (!this.data) {
        reject("Data is required");
      } else {
        const data = this.schema.all();
        localStorage.setItem(this.schema.path, JSON.stringify(data));
        resolve(data);
      }
    });
  }

  /**
   * for using the data as immidiate acccess
   * @returns the data of the object
   */
  valueOf() {
    return this.data;
  }
}
