import { fnet } from "../fserverFramework/fnet.js";

const app = fnet('my.awsome.site.com');
app.text();


app.get("/", (req, res) => {
  res.send('{"data":"Hello World!"}');
});



app.litsen(80);