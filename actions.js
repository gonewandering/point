const leds = require('./lib/leds')
const Sensors = require('./lib/sensors')
const sensors = new Sensors(500)
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
  sensors.track(data => {
    leds.set('send')

    let evs = [
      log.send({label: 'z-axis', value: data.accel.Z }),
      log.send({label: 'y-axis', value: data.accel.Y }),
      log.send({label: 'x-axis', value: data.accel.X }),
      log.send({label: 'temperature', value: data.temperature }),
      log.send({label: 'pressure', value: data.pressure })
    ]

    Promise.all(evs).then(labels.set.bind(null, 'arrow'))
  })

  leds.set('arrow')
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
