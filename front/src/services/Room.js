import Socket from './Socket'
function Room(room) {
  this.id = room.id
  this.users = room.users
  this.quizz = room.quizz

  Socket.socket.on("update:users", users => {
    if(users && Array.isArray(users)) {
      return this.users = users
    }
    return this.users = [];
  });
  Socket.socket.on("error", (data) => {
    alert(data);
  })
}
export default Room