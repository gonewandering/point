const leds = require('./lib/leds')
const Sensors = require('./lib/sensors')
const sensors = new Sensors(500)

var act = function () { }
sensors.on(act)
sensors.monitor()

module.exports = {
  up: () => {
    sensors.track(console.log)
    act = console.log
    leds.set('arrow')
  },
  down: () => {
    sensors.track()
    act = function () { }
    leds.set('cross')
  }
}
