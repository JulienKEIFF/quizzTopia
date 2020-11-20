const express = require("express");
const apiPath = require("./routes/api.js");

// App setup
const PORT = process.env.PORT || 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
app.port = PORT;

io = require('socket.io').listen(server);

// Static files
app.use(express.static("public"));
app.use('/api', apiPath);

io.on('connection', (socket)=>{

  socket.on("connectRoom", (data)=>{
    socket.join(data.roomId);

    if(clientByRoom[data.roomId] !== undefined){
      
      if(clientByRoom[data.roomId].username.length >= 10){
        data.roomId = data.roomId + '-1';
        clientByRoom[data.roomId] = {username: []};
        clientByRoom[data.roomId].username.push({username: data.username, id: socket.id});
      }else{
        clientByRoom[data.roomId].username.push({username: data.username, id: socket.id});
      }

    }else{
      clientByRoom[data.roomId] = {username: []};
      clientByRoom[data.roomId].username.push({username: data.username, id: socket.id});
    }

    socket.emit('toRoom', data.roomId);
    io.emit('userList', clientByRoom[data.roomId].username);
  })

  socket.on("updateUser", (data)=>{
    console.log(data);
    if(clientByRoom[data.roomId] !== undefined){
      socket.emit('userList', clientByRoom[data.roomId].username);
    }
  })

  socket.on("leave room", (roomToLeave)=>{
    socket.leave(roomToLeave);
    let index = clientByRoom[roomToLeave].username.findIndex(i => i.id === socket.id);
    clientByRoom[roomToLeave].username.splice(index, 1);
    console.log(index);
    clientByRoom[roomToLeave].username;
    io.to(roomToLeave).emit('userList', clientByRoom[roomToLeave].username);
  })

})

clientByRoom = {}