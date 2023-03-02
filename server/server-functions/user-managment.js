import {
  updateUser as updateUserDB,
  deleteUser as deleteUserDB,
} from "../../data-manager/dataFunctions/users.js";

export function updateUser(req, res) {
  const userData = JSON.parse(req.body).userData;
  if (!userData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  updateUserDB(userData).then((results) => {
    res.json(results);
  });
}

export function deleteUser(req, res) {
  const userId = JSON.parse(req.body).userId;
  if (!userId) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  deleteUserDB(userId).then((results) => {
    
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}
