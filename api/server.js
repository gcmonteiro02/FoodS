require("dotenv").config();

const http = require("http");
const app = require("./app/src/app");
const port = process.env.PORT ? process.env.PORT : 3000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
