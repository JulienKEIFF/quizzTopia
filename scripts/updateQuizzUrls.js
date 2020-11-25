const axios = require('axios').default
const cheerio = require('cheerio')
const pathfs = require('path')
const PromiseB = require('bluebird')
const FormData = require('form-data');
const fse = require('fs-extra')

const url = "https://openquizzdb.org/listing.php"
const downloadURL = "https://openquizzdb.org/download.php"

async function importer() {
  const { data: categs } = await axios.get(url)
  const $categs = cheerio.load(categs)
  let jsonUrls = await PromiseB.map($categs('.myhref').toArray(), async categ => {
    const onclick = categ.attribs.onclick
    const regex = /\d+/gi
    const id = regex.exec(onclick)[0]
    
    console.log('Parse id:', id)
    let form = new FormData();
    form.append('id',id)
    const { data: quizz } = await axios.create({
      headers: form.getHeaders()
    }).post(downloadURL, form)
    const $quizz = cheerio.load(quizz)
    const quizzJSONURL = $quizz('.my_downbox  a')
      .toArray()
      .map(downbox => downbox.attribs.href)
      .filter(link => link.includes('.json'))
      .pop()
    return quizzJSONURL
  }, {concurrency: 5})
  jsonUrls = jsonUrls.filter(a => a)
  jsonUrls.sort()
  return fse.writeJSON(
    pathfs.resolve(__dirname, 'quizzList.json'),
    jsonUrls,
    {spaces: 2}
  )
}

importer().then(_ => console.log('Success')).catch(console.error)