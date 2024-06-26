const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port= 3000;



server.listen(port, ()=>{
  console.log(`${port}`);
});
