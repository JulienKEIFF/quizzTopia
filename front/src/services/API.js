import axios from 'axios'
import Room from './Room'
export default {
  instance: axios.create({
    baseURL: `${process.env.VUE_APP_SERVER_URL}:${process.env.VUE_APP_SERVER_PORT}`
  }),
  async getRoom(roomId) {
    const { data: room } = await this.instance.get(`/api/rooms/${roomId}`)
    if (room) return new Room(room)
  },
  async createRoom(username) {
    const { data: room } = await this.instance.post(`/api/rooms/create/${username}`)
    if (room) return new Room(room)
  },
  async joinExistingRoom(roomId, username) {
    const { data: room } = await this.instance.post(`/api/rooms/join/${roomId}/${username}`)
    if (room) return new Room(room)
  }
}