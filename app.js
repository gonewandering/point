const dev = require('point-device-sdk')
const actions = require('./actions')
const exec = require('./lib/hlp/exec')

const init = async function () {
  actions['on']()
  console.log( `Device (see) initiated: ${ dev.mid }`)

  dev.command.on('*', (cmd, data) => {
     console.log(cmd)
     actions[cmd] && actions[cmd](data)
  })
}

/** Stupid **/
/**
const express = require('express')
const app = express()

app.use(express.static('/home/pi/point-device-see/public'))

app.get('/', async (req, res) => {
   await exec(`raspistill -w 1024 -h 768 -q 70 -q 100 -sh 100 -ISO 100 -awb "auto" -mm "average" -ex "auto" -o "/home/pi/point-device-see/public/test.jpg" -t 1 -vf -hf`)
   //return res.redirect('/test.jpg')
   return res.send('<img src="/test.jpg" style="width: 100%; display: block;" />')
})

app.listen(3000, () => console.log('Preview server listening on port 3000!'))
**/
init()
