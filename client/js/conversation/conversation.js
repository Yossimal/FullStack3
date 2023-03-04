import $ from "../common/common.js";
import { logicalState, st } from "../html-tags/logic/logicalState.js";
import { registerFunction } from "../html-tags/router/Script.js";

registerFunction("getConversation", getConversation);
registerFunction("sendMessage", sendMessage);

export function getConversation() {
  $.fget(
    `my.awsome.site.com/getConversationMessages?userPhone=${
      st("user").phone
    }&contactPhone=${st("conversation-contact")}`
  ).then((response) => {
    const res = JSON.parse(response);
    if (res.ok) {
      res.data = res.data.map((d) => {
        d.time = new Date(d.time);
        const dateFormat = Intl.DateTimeFormat(undefined, {
          timeStyle: "short",
          dateStyle: "short",
        });
        d.time = dateFormat.format(d.time);
        return d;
      });
      logicalState("conversation", res.data);
    } else {
      alert(res.reason);
    }
  });
}

export function sendMessage() {
  const message = $.id("messageTextbox").value;
  const messageData = {
    messageData: {
      content: message,
      senderPhoneNumber: st("user").phone,
      receiverPhoneNumber: st("conversation-contact"),
      time: new Date(),
    },
  };
  $.fput("my.awsome.site.com/sendMessage", messageData, {}).then((response) => {
    const res = JSON.parse(response);
    if (res.ok) {
      getConversation();
      $.id("messageTextbox").value = "";
    } else {
      alert(res.reason);
    }
  });
}
