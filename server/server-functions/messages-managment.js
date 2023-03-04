import {
  createMessage,
  getAllMessagesOfConversation,
} from "../../data-manager/dataFunctions/messages.js";

export function sendMessage(req, res) {
  const messageData = JSON.parse(req.body).messageData;
  if (messageData.content === "") {
    res.json({ ok: false, reason: "message cant be empty" });
    return;
  }
  if (messageData.time > new Date()) {
    res.json({ ok: false, reason: "time cant be in the future" });
    return;
  }
  createMessage(messageData).then((results) => {
    res.json(results);
  });
}

export function getConversationMessages(req, res) {
  const userPhone = req.queryParams["userPhone"];
  const contactPhone = req.queryParams["contactPhone"];
  if (!userPhone || !contactPhone) {
    res.json({
      ok: false,
      reason: "bad request: Need userPhone and contactPhone",
    });
    return;
  }
  getAllMessagesOfConversation(userPhone, contactPhone)
    .then((results) => {
      if (!results.ok) {
        res.json(results);
        return false;
      }
      return results.data.sort((a, b) => new Date(a.time) - new Date(b.time));
    })
    .then((data) => {
      if (data === false) {
        return;
      }
      res.json({ ok: true, data });
    });
}
