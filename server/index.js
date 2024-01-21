const express = require('express');
const {Server} = require('socket.io');

const app = express();

const server = require('http').createServer(app);


const io = new Server(server, {
  cors:{
    origin: '*',
    methods: ['GET', 'POST']
  }
});

server.listen(4000, () => {
    console.log('Server started on :4000');
});

app.get('/', (req, res) => {
    res.send('Hello world');
})

io.on('connection', (socket) => {
  console.log('a user connected,',socket.id);
  socket.on('msg', ({newMsg, roomName}) => {
    if(!roomName){
      socket.broadcast.emit('receive-msg', newMsg);
    }else{
      socket.to(roomName).emit('receive-msg', newMsg);
    }
    
  });

  socket.on('join-room', (roomName) => {
    socket.join(roomName);
    console.log(`Joined room ${roomName}`);
  });


})


