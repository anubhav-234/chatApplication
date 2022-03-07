// This is our node Server which will handle our socket.io
console.log("Application Started....");
const port = process.env.PORT || 5000 
const io = require('socket.io')(port, {
    cors: {
      origin: '*',
    }
});

const users = {};

io.on("connection", (socket) =>{

    // When new user joins
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    // when any user sends the message 
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message,name: users[socket.id]});
    });

  // When someone will leave the chat
  socket.on('disconnect',message =>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
  });

});

