import Contact from "../schemas/Contact.js";
import User from "../schemas/User.js";

/**
 * the reasons for the contact not being valid
 */
export const Reasons = {
  USER_ID_NOT_EXISTS: "user id does not exists",
  PHONE_NUMBER_EXISTS: "phone number already saved for this user",
  NO_CONTACT_ID: "no contact id",
  CONTACT_NOT_FOUND: "contact not found",
};

/**
 * add a new contact to the database
 * @param {any} contact the data of the contact to add
 * @returns promise of the contact added
 */
export async function addContact(contact) {
  const cont = new Contact(contact);
  const isValid = await checkContactValidationForAdd(cont);
  if (isValid.ok) {
    return cont.save().then((dat) => ({ ok: true, data: dat }));
  } else {
    return isValid;
  }
}

/**
 * update a contact in the database
 * @param {any} contact the contact to update with the id of the contact to update
 * @returns promise of the contact updated
 */
export async function updateContact(contact) {
  if (!contact._id) {
    return { ok: false, reason: Reasons.NO_CONTACT_ID };
  }
  const contacts = await Contact.find({ _id: contact._id });
  if (contacts.length === 0) {
    return { ok: false, reason: Reasons.CONTACT_NOT_FOUND };
  }
  const cont = new Contact({ ...contacts[0], ...contact });
  const isValid = await checkContactValidationForAdd(cont);
  if (isValid.ok) {
    return cont.save().then((dat) => ({ ok: true, data: dat }));
  } else {
    return isValid;
  }
}

/**
 * delete a contact from the database
 * @param {any} id the contact id to delete
 * @returns promise of the contact deleted
 */
export async function deleteContact(id) {
  if (!id) {
    return { ok: false, reason: Reasons.NO_USER_ID };
  }
  return await Contact.remove({ _id: id }).then((dat) => ({
    ok: true,
    data: dat,
  }));
}

/**
 * get specific contact of specific user by contact phone number
 * @param {any} data the contact creator id and phone number
 * @returns promise with the right contact
 */
export async function getContactByPhoneAndId(data) {
  return Contact.find({ creatorId: data.creatorId, phone: data.phone }).then(
    (dat) => {
      if (dat.length === 0) {
        return { ok: false, reason: Reasons.CONTACT_NOT_FOUND };
      }
      return { ok: true, data: dat[0] };
    }
  );
}

/**
 * get all the contact that saved me
 * @param {any} myPhone my phone number
 * @returns promise with all the contacts that saved me
 */
export async function getOtherContactsByMyPhone(myPhone) {
  return Contact.find({ phone: myPhone }).then((dat) => {
    return { ok: true, data: dat };
  });
}

/**
 * check if contact is valid contact
 * @param {contact} contact the contact to check
 */
async function checkContactValidationForAdd(contact) {
  let check = await User.find({ _id: contact.creatorId });
  if (check.length === 0) {
    return { ok: false, reason: Reasons.USER_ID_NOT_EXISTS };
  }
  check = await Contact.find({
    creatorId: contact.creatorId,
    phone: contact.phone,
  });
  if (check.length !== 0 && check[0]._id != contact._id) {
    return { ok: false, reason: Reasons.PHONE_NUMBER_EXISTS };
  }
  return { ok: true };
}

/**
 * get all the contact of the user
 * @param {string} id the user id
 * @returns promise of all the contacts of the user
 */
async function allContactsOfUser(id) {
  if (!id) {
    return { ok: false, reason: Reasons.NO_USER_ID };
  }
  return await Contact.find({ creatorId: id }).then((dat) => {
    return { ok: true, data: dat };
  });
}
