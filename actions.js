const leds = require('./lib/leds')
const Sensors = require('./lib/sensors')
const sensors = new Sensors(500)

var act = functio () { }
sensors.on(act)

module.exports = {
  up: () => {
    act = console.log
    leds.set('arrow')
  },
  down: () => {
    act = function () { }
    leds.set('cross')
  }
}
