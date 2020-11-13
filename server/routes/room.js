const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
  res.json({Type: "ROOM"})
  console.log(port)
})

module.exports = router;