import { fnet } from "../fserverFramework/fnet.js";
import { initDatabase } from "../data-manager/init.js";

import * as authenticationFunctions from "./server-functions/authentication.js";
import * as userManagmentFunctions from "./server-functions/user-managment.js";
import * as contactManagment from "./server-functions/contact-managment.js";

const app = fnet("my.awsome.site.com");
app.text();

initDatabase();

//test
app.get("/", (req, res) => {
  res.send('{"data":"Hello World!"}');
});
app.post("/calc", (req, res) => {
  const data = JSON.parse(req.body);
  const x = data.x;
  const y = data.y;
  res.json({ x: x, y: y, ans: x + y });
});
//authentication
app.put("/addUser", authenticationFunctions.register);
app.post("/updateUser", userManagmentFunctions.updateUser);
app.delete("/deleteUser", userManagmentFunctions.deleteUser);
app.post("/login", authenticationFunctions.login);
//contact managment
app.put("/addContact", contactManagment.createContact);
app.post("/editContact", contactManagment.editContact);
app.delete("/deleteContact", contactManagment.deleteContact);

app.litsen(80);
