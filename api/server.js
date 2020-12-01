const express = require('express');
const http = require('http');
const app = require("./app/src/app")
const port = process.env.PORT;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);