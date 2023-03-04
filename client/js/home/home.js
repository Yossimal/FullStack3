import { registerFunction } from "../html-tags/router/Script.js";
import $ from "../common/common.js";
import { logicalState, st } from "../html-tags/logic/logicalState.js";
import { redirect } from "../html-tags/router/Container.js";

registerFunction("setContact", setContact);
registerFunction("loadContacts", loadContacts);
registerFunction("openConversation", openConversation);

export function setContact(contactId) {
  const contact = st("contacts").find((c) => c._id === contactId);
  logicalState("current-contact", contact);
  $.id("contactName").value = contact.name;
  $.id("contactPhone").value = contact.phone;
}

export function loadContacts() {
  $.fget(`my.awsome.site.com/allContactsOfUser?userId=${st("user")._id}`).then(
    (results) => {
      const res = JSON.parse(results);
      if (res.ok) {
        if (res.data.length === 0) {
          return;
        }
        logicalState("contacts", res.data);
      } else {
        alert(res.reason);
      }
    }
  );
}

export function openConversation(contactPhone) {
  logicalState("conversation-contact", contactPhone);
  redirect("main", "/client/html/conversation/conversation.html");
}
