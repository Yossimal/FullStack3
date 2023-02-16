import { fhttp } from "./fhttp";

export const app = fhttp();

app.get("/test", (req, res) => {

});