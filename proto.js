const dev = require('point-device-sdk')
const delay = require('./lib/delay')
var track = false

dev.command.on('on', () => {
  dev.status.send('on')
})

dev.command.on('track', async () => {
  track = true

  dev.status.send('active')

  while (track == true) {
    await delay(1000)
    await dev.log.send({
      value: Math.round(Math.random() * 1000) / 100,
      key: 'not sure'
    })
  }
})

dev.command.on('stop', async () => {
  track = false
  dev.status.send('paused')
})

dev.command.on('off', async () => {
  dev.status.send('off')
})

dev.status.get(status => {
  console.log(status)
})

async function run() {
  console.log('run')
  await dev.command.send(dev.mid, 'on')
  await delay(1000)
  console.log('on')
  await dev.command.send(dev.mid, 'track')
  await delay(5000)
  console.log('track')
  await dev.command.send(dev.mid, 'stop')
  await delay(1000)
  await dev.command.send(dev.mid, 'off')
}

run()
