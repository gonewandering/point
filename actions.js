const Sensors = require('./lib/sensors')
const Log = require('./lib/log')
const schemes = require('./schemes')
const leds = require('./lib/leds')
const exec = require('./lib/hlp/exec')
const process = require('process')
const config = require('./config')

const sensors = new Sensors(config.interval)
const log = new Log()
const actions = {}

actions.start = function () {
  leds.set('idle')
  log.on()
}

actions.up = function () {
  leds.set('track')
  log.start()

  schemes[config.scheme.type]({
    sensors: sensors,
    log: log,
    options: config.scheme
  })
}

actions.down = function () {
  leds.set('idle')
  sensors.pause()
  log.pause()
}

actions.left = function () {
  leds.set('update1')
  log.update()

  return exec('git pull origin master')
    .then(leds.set.bind(null, 'update2'))
    .then(exec.bind(null, 'npm install')
    .then(leds.set.bind(null, 'update3'))
}

actions.right = function () {
  leds.set('idle')
  log.restart()

  process.exit(1)
}

module.exports = actions
