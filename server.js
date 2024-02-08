const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let likes = 0;
let comments = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit initial data
  socket.emit('initialData', { likes, comments });

  socket.on('like', () => {
    likes++;
    io.emit('updateLikes', likes);
  });

  socket.on('comment', (comment) => {
    comments.push(comment);
    io.emit('updateComments', comments);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
