<template>
  <div is="main">
    <h1>Personne présente sur le salon</h1>
    <div>
      <ul>
        <li v-for="user in userlist" :key="user">{{ user }}</li>
      </ul>
    </div>
    <input v-model="username" type="text" name="username" id="username" />
    <div v-if="username">Votre username: {{ username }}</div>
    <button v-on:click="newUserConnected()">Connexion</button>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:5000/api/room", {
  "sync disconnect on unload": true,
});

export default {
  name: "connect",
  data: () => ({
    username: "",
    userlist: [],
    logged: false,
  }),
  methods: {
    newUserConnected() {
      if (this.username && !this.logged) {
        socket.emit("login", this.username);
        socket.on("login", (data) => {
          this.userlist = [];
          this.userlist = data;
        });
        !this.logged ? (this.logged = true) : "";
      }
    },
    updateList(data) {
      this.userlist = data;
    },
  },
  mounted() {
    socket.emit("getList");
    socket.on("getList", (data) => {
      if (data.length > 0) {
        console.log(data);
        this.userlist = [];
        this.userlist = data;
      }
    });
    socket.on("change state", (data) => {
      this.updateList(data);
    });
    socket.on('hi', (data)=> {console.log(data)})
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  width: 30%;
  background: rgb(189, 189, 189);
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.418);
  margin: 0 auto;
  margin-bottom: 1vh;
}
li {
  border-bottom: 2px white;
}
li:last-of-type {
  border: none;
}
</style>
