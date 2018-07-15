const leds = require('./lib/leds')
const Sensors = require('./lib/sensors')
const sensors = new Sensors(500)
const cp = require('child_process')
const process = require('process')

var act = function () { }
sensors.monitor()

module.exports = {
  start: () => {
    leds.set('circle')
  },
  up: () => {
    sensors.track(console.log)
    leds.set('arrow')
  },
  down: () => {
    sensors.track()
    act = function () { }
    leds.set('cross')
  },
  left: () => {
    leds.set('update')
    console.log('starting update')
    cp.exec('git pull origin master', (err, stout, sterr) => {
      leds.set('update2')
      console.log('1. Pulled latest version')
      cp.exec('npm install', (err, stout, sterr) => {
        leds.set('update3')
        console.log('2. Installed Dependencies')
      }
      process.exit(1)
    })
  },
  right: () => {
    leds.set('blank')
    process.exit(1)
  }
}
