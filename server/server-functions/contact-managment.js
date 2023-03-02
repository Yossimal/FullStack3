import {
  addContact as addContactDB,
  updateContact as updateContactDB,
  deleteContact as deleteContactDB,
} from "../../data-manager/dataFunctions/contacts.js";

export function createContact(req, res) {
  const contactData = JSON.parse(req.body).contactData;
  if (!contactData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  addContactDB(contactData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}

export function editContact(req, res) {
  const contactData = JSON.parse(req.body).contactData;
  if (!contactData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  updateContactDB(contactData).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}

export function deleteContact(req, res) {
  const contactId = JSON.parse(req.body).contactId;
  if (!contactId) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  deleteContactDB(contactId).then((results) => {
    if (results.ok) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}

export function allContactsOfUser(req, res) {
  const userId = JSON.parse(req.body).userId;
  if (!userId) {
    res.json({ ok: false, reason: "bad request: No user Id" });
    return;
  }
    getContactsOfUserDB(userId).then((results) => {
      if (results.ok) {
        res.json({ ok: true, data: results.data });
      } else {
        res.json({ ok: false, reason: results.reason });
      }
    });
}