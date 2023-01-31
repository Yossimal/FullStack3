import { readAll, saveAll } from "../data-actions/coreActions.js";
import config from "../dbConfig.js";

export function DataObject() {
  return {
    table: "default",
    save: () => {
      return new Promise(config().dbName)
        .then((dbName) => [dbName, readAll(dbName)])
        .then(([dbName, data]) => {
            if(!this._id){
                this._id = crypto.randomUUID()
            }
          data[this._id] = this;
          return saveAll(dbName,data)
        });
    },
  };
}
