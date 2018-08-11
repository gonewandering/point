const dev = require('point-device-sdk')
const sensors = require('./lib/sensors')
const exec = require('./lib/hlp/exec')
const process = require('process')
const config = require('./config')
const schemes = require('./scheme')

const actions = {}

actions.on = function () {
  dev.status.update('on')
}

actions.config = async function (data) {
  await dev.status.update('updating config')
  await dev.config.set(data)
  await dev.status.update('idle')
}

actions.track = function () {
  dev.status.update('tracking')

  let freq = Math.round((dev.config.get('freq') || 1000) / 100)

  sensors.track()

  sensors.on(res => {
    schemes["people"](res)
  })
}

actions.pause = function () {
  dev.status.update('paused')
  sensors.pause()
}

actions.update = async function () {
  leds.set('update1')

  await dev.status.update('updating software')
  await exec(`cd ${ __dirname }`)
  await exec('git pull origin master')
  await exec('npm install')
  await dev.status.update('update-complete')

  return
}

actions.restart = async function () {
  await dev.status.update('restarting')
  await exec('sudo reboot')
}

actions.off = async function () {
  await dev.status.update('off')
  await exec('sudo shutdown -h now')
}

module.exports = actions
