var request = require('request-promise-native')
var mid = require('node-machine-id')
const imu = require("node-sense-hat").Imu;
const JoystickLib = require("node-sense-hat").Joystick;
const IMU = new imu.IMU();
const leds = require('./lib/leds')

var options = {
  monitoring: false
}

JoystickLib.getJoystick().then(joystick => {
  joystick.on("release", direction => {
    options.monitoring = !options.monitoring
    leds.set(options.monitoring ? 'arrow' : 'cross')
  })
})


function track() {
  IMU.getValue((err, data) => {
    // analyzeChange(data.accel)
    console.log(data.accel)
  })
}

function monitor() {
  setTimeout(() => {
    if (options.monitoring == true) {
      track().then(monitor)
    }
    monitor()
  }, 10 0)
}

function analyzeChange(data) {
  for (var n in data) {
    change[n] = change[n] || {l: 0, d: 0}
    change[n].d = Math.abs(Math.abs(change[n].l) - Math.abs(data[n]))

  }
}

monitor()
