import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

Vue.use(VueRouter);

Vue.use(VueSocketIOExt, socket)

import App from './App.vue'
import Home from './Views/Home.vue'
import Room from './Views/Room.vue'
import Connect from './components/Connect.vue'

Vue.config.productionTip = false

const routes = [
  { name: 'home' ,path: '/', component: Home },
  { name: 'game', path: '/game/:room', component: Room},
  { name: 'connect', path: '/connect', component: Connect}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'game' && from.name === 'game') {
    const answer = window.confirm("Voulez vous vous deconnecter ?")
    if (answer) {
      socket.emit('leave room', from.params.room)
      socket.emit('updateUser', {roomId: from.params.room})
      next()
    } else {
      next(false)
    }
  }else next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
