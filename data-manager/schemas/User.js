import DataObject from "../../LDBJS/dataObject.js";

export default class User extends DataObject {
  static get _name() {
    return "users";
  }

  constructor(data) {
    super(data);
  }

  static get _schema() {
    return [...super._schema, "name", "phone", "password", "email"];
  }
}
