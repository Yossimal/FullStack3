import Message from "../schemas/Message.js";
import User from "../schemas/User.js";

export function createMessage(msg) {
  return User.find({ phone: msg.senderPhoneNumber }).then((users) => {
    if (users.length === 0) {
      return { ok: false, reason: "sender not found" };
    }

    const toAdd = new Message(msg);
    return toAdd.save().then((data) => ({ ok: true, data }));
  });
}

export async function getAllMessagesOfConversation(phone1,phone2) {
  const sent = await Message.find({ senderPhoneNumber: phone1 });
  const recived = await Message.find({ senderPhoneNumber: phone2 });
  return {ok:true,data:[...sent, ...recived]};
}
