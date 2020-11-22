const express = require('express');
const sockets = require('../services/sockets');
const Rooms = require('../services/Rooms')
const Users = require('../services/Users');
const router = express.Router();
const uuid = require('uuid').v4

router.get('/:roomId', (req, res, next) => {
  const { roomId } = req.params
  const room = Rooms.get(roomId)
  if(room) {
    res.json(room)
  } else {
    res.status(404).send('Room not found')
  }
})
router.post('/create/:username', (req, res, next) => {
  const { username } = req.params
  const roomId = uuid().split('-')[0]
  const user = Users.getOrCreate(username)
  const room = Rooms.getOrCreate(roomId, user.username)
  room.join(user)
  res.json(room)
})
router.post('/join/:roomId/:username', (req, res, next) => {
  const { roomId, username } = req.params
  const user = Users.getOrCreate(username)
  const room = Rooms.get(roomId)
  if (room) {
    room.join(user)
    res.json(room)
  } else {
    res.status(404).send('Room not found')
  }
})

module.exports = router;