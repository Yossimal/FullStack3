import { fnet } from "../fserverFramework/fnet.js";
import { initDatabase } from "../data-manager/init.js";
import {
  addUser,
  updateUser,
  deleteUser,
  getUserByName,
} from "../data-manager/dataFunctions/users.js";
import {
  addContact,
  updateContact,
  deleteContact,
} from "../data-manager/dataFunctions/contacts.js";

const app = fnet("my.awsome.site.com");
app.text();

initDatabase();

app.get("/", (req, res) => {
  res.send('{"data":"Hello World!"}');
});

app.post("/calc", (req, res) => {
  const data = JSON.parse(req.body);
  const x = data.x;
  const y = data.y;
  res.json({ x: x, y: y, ans: x + y });
});

app.put("/addUser", (req, res) => {
  const userData = JSON.parse(req.body).userData;
  if (!userData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  addUser(userData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
});

app.post("/updateUser", (req, res) => {
  const userData = JSON.parse(req.body).userData;
  if (!userData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  updateUser(userData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
});

app.delete("/deleteUser", (req, res) => {
  const userId = JSON.parse(req.body).userId;
  if (!userId) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  deleteUser(userId).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
});

app.post("/login", (req, res) => {
  const data = JSON.parse(req.body).userData;
  const password = data.password;
  const name = data.name;
  getUserByName(name).then((user) => {
    if (user.ok) {
      if (user.data.password === password) {
        res.json({ ok: true, data: user.data });
        return;
      }
    }
    res.json({ ok: false, reason: "wrong password or username" });
  });
});

////////////////////////////////////////////////////////////////////

app.put("/addContact", (req, res) => {
  const contactData = JSON.parse(req.body).contactData;
  if (!contactData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  addContact(contactData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
});

app.post("/updateContact", (req, res) => {
  const contactData = JSON.parse(req.body).contactData;
  if (!contactData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  updateContact(contactData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
});

app.delete("/deleteContact", (req, res) => {
  const contactId = JSON.parse(req.body).contactId;
  if (!contactId) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  deleteContact(contactId).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
});

app.litsen(80);
