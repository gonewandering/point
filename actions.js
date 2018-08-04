const dev = require('point-device-sdk')
const sensors = require('./lib/sensors')
const leds = require('./lib/leds')
const exec = require('./lib/hlp/exec')
const process = require('process')
const config = require('./config')

const actions = {}

actions.on = function () {
  leds.set('idle')
  dev.status.update('on')
}

actions.track = function () {
  leds.set('track')
  dev.status.update('tracking')

  sensors.on(res => {
    if (res.rp % 10 == 0) {
      dev.log.send({event: 'z-angle', value: data.gyro.x }),
      dev.log.send({event: 'y-angle', value: data.gyro.y }),
      dev.log.send({event: 'x-angle', value: data.gyro.z }),
      dev.log.send({event: 'temperature', value: data.temperature }),
      dev.log.send({event: 'pressure', value: data.pressure })
    }
  })
}

actions.pause = function () {
  leds.set('idle')
  dev.status.update('paused')
  sensors.pause()
}

actions.update = async function () {
  leds.set('update1')

  await dev.status.update('updating')
  await exec('git pull origin master')
  await leds.set.bind(null, 'update2')
  await exec.bind(null, 'npm install')
  await leds.set.bind(null, 'update3')
  await dev.status.update('update-complete')

  return
}

actions.restart = async function () {
  leds.set('idle')
  await dev.status.update('restarting')

  process.exit(1)
}

module.exports = actions
