const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{
  console.log('A user connected');

  //sending event to client: 
  //socket.on Listens to an event 'chat message' sent by client: 
  //io.emit sends message to all connected clients
  socket.on('chat message', (msg)=>{
    io.emit('chat message', msg);
  });

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  })
})


const port= 3000;
server.listen(port, ()=>{
  console.log(`Listening on port: ${port}`);
});
