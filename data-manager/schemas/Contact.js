import DataObject from "../../LDBJS/dataObject.js";

export default class Contact extends DataObject {
  constructor(data) {
    super(data);
  }

  static get _schema() {
    return [...super._schema, "name", "phone", "creatorId"];
  }

  static get _name() {
    return "contacts";
  }
}
