const dev = require('point-device-sdk')
const sensors = require('./lib/sensors')
const exec = require('./lib/hlp/exec')
const process = require('process')
const config = require('./config')

const actions = {}

actions.on = function () {
  dev.status.update('on')
}

actions.config = async function (data) {
  await dev.status.update('updating')
  await dev.config.set(data)
  await dev.status.update('idle')
}

actions.track = function () {
  dev.status.update('tracking')

  let freq = Math.round((dev.config.get('freq') || 1000) / 100)

  sensors.track()

  sensors.on(res => {
    if (sensors.rp % freg == 0) {
      schemes["people"]()
    }
  })
}

actions.pause = function () {
  dev.status.update('paused')
  sensors.pause()
}

actions.update = async function () {
  leds.set('update1')

  await dev.status.update('updating')
  await exec('git pull origin master')
  await exec('npm install')
  await dev.status.update('update-complete')

  return
}

actions.restart = async function () {
  await dev.status.update('restarting')
  process.exit(1)
}

module.exports = actions
