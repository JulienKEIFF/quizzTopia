const axios = require('axios').default
const PromiseB = require('bluebird')
const {mongo} = require('../server/services/mongoConnect')
if(!process.env.mongodbURL) {
  console.error('Please specify a mongodbURL environment variable')
  process.exit(1)
}

const quizzList = require('./quizzList.json')

async function importer() {
  await mongo.connect(process.env.mongodbURL)
  await PromiseB.map(quizzList, async quizzUrl => {
    const { data: json } = await axios.get(quizzUrl)
    json._id = json.thème
    delete json.thème
    console.log('Import:', json._id)
    return mongo.collection('quizz').updateOne({_id: json._id}, {$set: json}, {upsert: true})
  })
  mongo.client.close();
}

importer().then(_ => console.log('Success')).catch(console.error)