<template>
  <div is="main">
    <h1>QuizzTopia</h1>

    <div id="choice">
        <div id="game" class="card">
          <h2>Creer / Rejoindre un salon</h2>
          <div id="form-room">
            <input v-model="roomId" type="text" name="room-id" id="room-id-input" placeholder="ex: RFS555S (max: 10)" :maxlength="10">
            <button v-on:click="checkRoom()">Rejoindre</button>
          </div>
        </div>
    </div>

    <div id="username">
        <input v-model="userName" type="text" name="username" id="username-input" placeholder="John Doe">
    </div>

    <div id="bg">
      <video id="video" muted autoplay loop src="./../assets/video/Space-BG.mp4"></video>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data: () => ({
    roomId: "",
    userName: ""
  }),
  methods: {
    checkRoom(){
      if(this.userName === ""){
        alert("Veuillez renseigner un pseudo")
      }else{
        this.$socket.client.emit('connectRoom', {roomId: this.roomId, username: this.userName})
        this.$socket.client.on('toRoom', (data)=>{
          if(data !== undefined){
            this.goRoom(data)
          }
        })
      }
    },
    goRoom(data){
      this.$router.push({ name: 'game', params: { room: data } })
    }
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#main{
  height: 100vh;
  width: 100vw;
  background: black;
}
h1{
  font-size: 10vw;
  font-family: "Dimbo";
  color: #d45454;
}
#choice{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  background: rgb(255, 255, 255);
  border-radius: 3vh;
  width: 60%;
  height: 20vh;
  .card{
    position: relative;
    left: 50%;
    top: 50%;
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 90%;
    height: 90%;
    transform: translate(-50%, -50%);
  }
}
#username{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20vw;
}

#bg{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  box-shadow: inset 0 0 200px #000, inset 0 0 200px #000;
  #video{
    filter: blur(5px);
  }
}
</style>
