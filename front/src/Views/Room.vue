<template>
  <div id="main">
    <h1>ROOM "{{ room.id }}"</h1>
    <div id="content"></div>
    <div id="userlist">
      <h2>Joueur dans le salon</h2>
      <h2>{{ room.users.length }}/10</h2>
      <ul>
        <li v-for="user in room.users" v-bind:key="user.username">{{ user.username }} <div class="score">{{user.score || 0}}</div> </li>
      </ul>
    </div>

    <button id="button-launch" v-if="isAdmin && !room.launched" v-on:click="launchGame">Lancer la partie</button>
  </div>
</template>

<script>
import Api from '../services/API'
import Socket from '../services/Socket';
export default {
  name: "Room",
  data() {
    return  {
      isAdmin: true,
      username: localStorage.getItem('username'),
      room: {
        id: '',
        users: [],
        quizz: {
          question: '',
          choices: []
        }
      }
    }
  },
  async mounted() {
    if(!this.username) this.goToHome()
    this.room.id = this.$route.params.room;
    this.room = await Api.getRoom(this.room.id)
      .catch(() => this.goToHome())
    Socket.socket.emit('connectRoom', this.username, this.room.id)
  },
  methods: {
    goToHome() {
      this.$router.push({name: 'home'})
    },
    launchGame() {
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 75vw;
  padding-left: 25vw;
  background: linear-gradient(#FFD166, #ffd574);
  h1{
    margin-top: 2vw;
    color: #EF476F;
    font-size: 5vw;
    font-family: "Dimbo";
    text-shadow: rgba(0, 0, 0, 0.287) 5px 5px 5px;
  }
  #userlist {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 25vw;
    background: linear-gradient(#26547C, #306a9c);
    box-shadow: rgba(0, 0, 0, 0.425) 5px 0px 5px;
    h2{
      font-size: 3.5vw;
      color: #06D6A0;
      font-family: "Dimbo";
      margin-bottom: 0;
      &:last-of-type{
        margin-top: 0;
      }
    }
    ul {
      position: relative;
      list-style: none;
      width: 80%;
      padding-inline-start: 0;
      margin: 10vh auto;
      li {
        position: relative;
        left: 0;
        display: flex;
        align-items: center;
        height: 5vh;
        border-bottom: black solid 1px;
        font-family: "Dimbo";
        font-size: 2vw;
        color: #EF476F;
        padding-left: 5%;
        width: 100%;
        &:last-of-type {
          border: none;
        }
        &:nth-child(even){
          color: #FFD166;
        }
        .score{
          position: absolute;
          right: 5%;
        }
      }
    }
  }
  #button-launch{
    position: absolute;
    bottom: 5vh;
    left: 5vw;
    width: 15vw;
    height: 7vw;
    font-family: "Dimbo";
    font-size: 2.5vw;
    background: #06D6A0;
    border: none;
    transition-duration: 0.5s;
    &:focus{
      transition-duration: 0.5s;
      background: #EF476F;
    }
  }
}
</style>
