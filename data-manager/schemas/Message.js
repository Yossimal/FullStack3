import DataObject from "../../LDBJS/dataObject.js";

export default class Message extends DataObject {
  constructor(data) {
    super(data);
  }

  static get _schema() {
    return [...super._schema, "content", "senderPhoneNumber", "receiverPhoneNumber", "time"];
  }

  static get _name() {
    return "messages";
  }
}
