import { registerFunction } from "../html-tags/router/Script.js";
import $ from "../common/common.js";
import { logicalState, st } from "../html-tags/logic/logicalState.js";

registerFunction("editContact", editContact);
registerFunction("unsetContact", unsetContact);
registerFunction("deleteContact", deleteContact);

export function editContact() {
  const contactName = $.id("contactName").value;
  const contactPhone = $.id("contactPhone").value;
  const contact = {
    name: contactName,
    phone: contactPhone,
    creatorId: st("user")._id,
  };
  //if there is no contact state -> create new contact
  if (!st("current-contact")) {
    const req = {
      contactData: contact,
      auth: { _id: st("user")._id },
    };
    $.fput("my.awsome.site.com/addContact", req).then((results) => {
      const res = JSON.parse(results);
      if (res.ok) {
        alert("contact created");
        unsetContact();
        logicalState("contacts", [...(st("contacts") ?? []), res.data]);
      } else {
        alert(res.reason);
      }
    });
  }
  //if there is a contact state -> update contact
  else {
    contact._id = st("current-contact")._id;

    const req = {
      contactData: contact,
      auth: { _id: st("user")._id },
    };
    $.fpost("my.awsome.site.com/editContact", req).then((results) => {
      const res = JSON.parse(results);
      if (res.ok) {
        alert("contact updated");
        unsetContact();
        //update the contact in the contacts state
        logicalState(
          "contacts",
          st("contacts").map((c) => {
            if (c._id === res.data._id) {
              return res.data;
            } else {
              return c;
            }
          })
        );
      } else {
        alert(res.reason);
      }
    });
  }
}

export function unsetContact() {
  logicalState("current-contact", null);
  $.id("contactName").value = "";
  $.id("contactPhone").value = "";
}

export function deleteContact() {
  if (!st("current-contact")) {
    alert("no contact selected");
  }
  $.fdelete(
    `my.awsome.site.com/deleteContact?contactId=${st("current-contact")._id}`
  ).then((results) => {
    const res = JSON.parse(results);
    if (res.ok) {
      alert("contact deleted");
      //remove the contact from the contacts state
      logicalState(
        "contacts",
        st("contacts").filter((c) => c._id !== st("current-contact")._id)
      );
      unsetContact();
    } else {
      alert(res.reason);
    }
  });
}
