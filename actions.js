const leds = require('./lib/leds')
const Sensors = require('./lib/sensors')
const sensors = new Sensors(500)
const exec = require('child_process')

var act = function () { }
sensors.monitor()

function (data) {
  for (var n in data.accel) {

  }
}

module.exports = {
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
    exec('git pull origin master').then(() => {
      process.exit()
    })
  }
}
