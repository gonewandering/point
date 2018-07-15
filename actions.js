const leds = require('./lib/leds')
const Sensors = require('./lib/sensors')
const sensors = new Sensors(2000)
const cp = require('child_process')
const process = require('process')
const Log = require('./lib/log')
const log = new Log()
const actions = {}

sensors.monitor()

actions.start = () => {
  leds.set('circle')
},

actions.up = () => {
  var col = 'send'

  sensors.track(data => {
    col = 'send' ? 'arrow' : 'send'
    leds.set(col)
    let evs = [
      log.send({label: 'z-acc', value: data.accel.x }),
      log.send({label: 'y-acc', value: data.accel.y }),
      log.send({label: 'x-acc', value: data.accel.z }),
      log.send({label: 'z-angle', value: data.gyro.x }),
      log.send({label: 'y-angle', value: data.gyro.y }),
      log.send({label: 'x-angle', value: data.gyro.z }),
      log.send({label: 'temperature', value: data.temperature }),
      log.send({label: 'pressure', value: data.pressure })
    ]
  })
},

actions.down = () => {
  sensors.track()
  leds.set('cross')
},

actions.left = () => {
  leds.set('update')
  cp.exec('git pull origin master', (err, stout, sterr) => {
    leds.set('update2')
    cp.exec('npm install', (err, stout, sterr) => {
      leds.set('update3')
    })
  })
},

actions.right = () => {
  leds.set('blank')
  process.exit(1)
}

module.exports = actions
