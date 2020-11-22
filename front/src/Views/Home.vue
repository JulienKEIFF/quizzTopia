<template>
  <div is="main" class="home-root">
    <home-background/>
    <h1>QuizzTopia</h1>
    <div id="choice">
      <h2>Creer / Rejoindre un salon</h2>
      <input v-model="username" @input="saveUsername($event.target.value)" type="text" name="username" id="username-input" placeholder="Entrez votre pseudo...">
      <div id="join-or-create-container" v-if="username">
        <button @click="isJoin = true" :style="{backgroundColor: !isJoin ? 'white': ''}">Rejoindre</button>
        <button @click="createRoom()" :style="{backgroundColor: isJoin ? 'white': ''}">Créér</button>
      </div>
      <input v-if="username && isJoin" v-model="roomId" type="text" name="room-id" id="room-id-input" placeholder="Entrez l'identifiant de partie..." :maxlength="10">
      <button v-on:click="joinRoom(roomId)" v-if="username && isJoin && roomId">Rejoindre</button>
    </div>
  </div>
</template>

<script>
import HomeBackgroundVue from '../components/HomeBackground.vue';
import API from '../services/API'
export default {
  name: "Home",
  components: {
    homeBackground: HomeBackgroundVue
  },
  data: () => ({
    roomId: "",
    username: localStorage.getItem('username'),
    isJoin: false
  }),
  methods: {
    saveUsername(username) {
      localStorage.setItem('username', username)
    },
    async createRoom() {
      this.isJoin = false
      const room = await API.createRoom(this.username)
      if(room) {
        this.goRoom(room.id)
      }
    },
    async joinRoom(roomId){
      const room = await API.joinExistingRoom(roomId, this.username)
      if(room) this.goRoom(room.id)
    },
    goRoom(roomId){
      this.$router.push({ name: 'game', params: { room: roomId } })
    }
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home-root{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
}
h1{
  position: absolute;
  top: calc(20vh - 1em);
  font-size: 4em;
  font-family: "Dimbo";
  color: #d45454;
}
#choice{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: rgb(255, 255, 255);
  border-radius: 20px;
  width: 400px;
  padding: 20px;
  box-sizing: border-box;
  max-width: 90%;
  h2{
    margin-bottom: 20px;
    color: #d45454;
    font-family: "Dimbo";
    font-size: 2em;
    margin-top: 5px;
  }
  .card{
    display: flex;
    flex-flow: column;
    width: 90%;
    height: 90%;
  }
}
</style>
