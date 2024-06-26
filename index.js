const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const moment = require('moment');

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{
  console.log('A user connected');

  //user will set their username: 
  socket.on('set username', (username)=>{
    socket.username = username;
    io.emit('user notification', `${username} has joined the chat`);
  })

  //sending event to client: 
  //socket.on Listens to an event 'chat message' sent by client: 
  //io.emit sends message to all connected clients
  socket.on('chat message', (msg)=>{
    const timestamp = moment().format('h:mm a');
    io.emit('chat message', {username:socket.username, msg, timestamp});
  });

  //user is typing: 
  socket.on('typing', ()=>{
    socket.broadcast.emit('typing', socket.username);
  })

  //user stops typing: 
  socket.on('stop typing', ()=>{
    socket.broadcast.emit('stop typing', socket.username);
  });

  //user disconnects: 
  socket.on('disconnect', ()=>{
    console.log('User disconnected');
    if(socket.username){
      io.emit('user notification', `${socket.username} has left the chat`);
    }
  });
});


const port= 3000;
server.listen(port, ()=>{
  console.log(`Listening on port: ${port}`);
});
