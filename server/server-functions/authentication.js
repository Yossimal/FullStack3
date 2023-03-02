import {
  addUser as addUserDB,
  updateUser as updateUserDB,
  deleteUser as deleteUserDB,
  getUserByName as getUserByNameDB,
} from "../../data-manager/dataFunctions/users.js";

export function register(req, res) {
  const userData = JSON.parse(req.body).userData;
  if (!userData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  addUserDB(userData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}


export function login(req, res) {
  const data = JSON.parse(req.body).userData;
  const password = data.password;
  const name = data.name;
  getUserByNameDB(name).then((user) => {
    if (user.ok) {
      if (user.data.password === password) {
        res.json({ ok: true, data: user.data });
        return;
      }
    }
    res.json({ ok: false, reason: "wrong password or username" });
  });
}
