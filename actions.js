const device = require('point-device-sdk')
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
  device.status.send('on')
}

actions.track = function () {
  leds.set('track')
  device.status.send('tracking')

  sensors.on(res => {
    if (res.rp % 10 == 0) {
      device.log.send({device: { id: device.mid }, type: 'z-angle', value: data.gyro.x }),
      device.log.send({device: { id: device.mid }, type: 'y-angle', value: data.gyro.y }),
      device.log.send({device: { id: device.mid }, type: 'x-angle', value: data.gyro.z }),
      device.log.send({device: { id: device.mid }, type: 'temperature', value: data.temperature }),
      device.log.send({device: { id: device.mid }, type: 'pressure', value: data.pressure })
    }
  })
}

actions.pause = function () {
  leds.set('idle')
  device.status.send('paused')
  sensors.pause()
}

actions.update = async function () {
  leds.set('update1')

  await device.status.send('updating')
  await exec('git pull origin master')
  await leds.set.bind(null, 'update2')
  await exec.bind(null, 'npm install')
  await leds.set.bind(null, 'update3')
  await device.status.send('update-complete')

  return
}

actions.restart = function () {
  leds.set('idle')
  await device.status.send('restarting')

  process.exit(1)
}

module.exports = actions
