import {
  addContact as addContactDB,
  updateContact as updateContactDB,
  deleteContact as deleteContactDB,
  allContactsOfUser as allContactsOfUserDB,
  getOtherContactsByMyPhone,
} from "../../data-manager/dataFunctions/contacts.js";

import { getUserById } from "../../data-manager/dataFunctions/users.js";

export function createContact(req, res) {
  const contactData = JSON.parse(req.body).contactData;
  if (!contactData) {
    res.json({ ok: false, reason: "no data" });
    return;
  }
  addContactDB(contactData).then((results) => {
    if (results.ok) {
      res.json({ ok: true, data: results.data });
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
      res.json({ ok: true, data: results.data });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}

export function deleteContact(req, res) {
  const contactId = req.queryParams["contactId"];
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
  const userId = req.queryParams["userId"];
  if (!userId) {
    res.json({ ok: false, reason: "bad request: No user Id" });
    return;
  }
  allContactsOfUserDB(userId).then((results) => {
    if (results.ok) {
      res.json({ ok: true, data: results.data });
    } else {
      res.json({ ok: false, reason: results.reason });
    }
  });
}

export async function savedMeContacts(req, res) {
  const myPhone = req.queryParams["myPhone"];

  if (!myPhone) {
    res.json({ ok: false, reason: "bad request: No phone number povided" });
    return;
  }
  const savedMeContacts = await getOtherContactsByMyPhone(myPhone);
  if (!savedMeContacts.ok) {
    res.json(savedMeContacts);
    return;
  }
  Promise.all(
    savedMeContacts.data.map((contact) => {
      return getUserById(contact.creatorId).then((user) => {
        if (!user.ok) {
          return { ok: false, reason: user.reason };
        }
        user = user.data;
        console.log(user);
        console.log(contact);
        return {
          _id: contact._id,
          phone: user.phone,
          userName: user.name,
          contactName: contact.name,
        };
      });
    })
  ).then((results) => {
    res.json({ ok: true, data: results });
  });
}
