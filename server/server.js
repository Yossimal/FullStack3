import { fnet } from "../fserverFramework/fnet.js";

const app = fnet("my.awsome.site.com");
app.text();

app.get("/", (req, res) => {
  res.send('{"data":"Hello World!"}');
});

app.post("/calc", (req, res) => {
  const data = JSON.parse(req.body);
  const x = data.x;
  const y = data.y;
  res.json({ x: x, y: y, ans: x + y });
});

app.litsen(80);
