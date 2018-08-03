const dev = require('point-device-sdk')
const sensors = require('./lib/sensors')
const schemes = require('./schemes')
const leds = require('./lib/leds')
const exec = require('./lib/hlp/exec')
const process = require('process')
const config = require('./config')

const log = new Log()
const actions = {}

actions.on = function () {
  leds.set('idle')
  dev.status.send('on')
}

actions.track = function () {
  leds.set('track')
  dev.status.send('tracking')

  sensors.on(res => {
    if (res.rp % 10 == 0) {
      dev.log.send({device: { id: dev.mid }, type: 'z-angle', value: data.gyro.x }),
      dev.log.send({device: { id: dev.mid }, type: 'y-angle', value: data.gyro.y }),
      dev.log.send({device: { id: dev.mid }, type: 'x-angle', value: data.gyro.z }),
      dev.log.send({device: { id: dev.mid }, type: 'temperature', value: data.temperature }),
      dev.log.send({device: { id: dev.mid }, type: 'pressure', value: data.pressure })
    }
  })
}

actions.pause = function () {
  leds.set('idle')
  dev.status.send('paused')
  sensors.pause()
}

actions.update = async function () {
  leds.set('update1')

  await dev.status.send('updating')
  await exec('git pull origin master')
  await leds.set.bind(null, 'update2')
  await exec.bind(null, 'npm install')
  await leds.set.bind(null, 'update3')
  await dev.status.send('update-complete')

  return
}

actions.restart = async function () {
  leds.set('idle')
  await dev.status.send('restarting')

  process.exit(1)
}

module.exports = actions
