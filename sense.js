var request = require('request-promise-native')
var mid = require('node-machine-id')
const imu = require("node-sense-hat").Imu;
const JoystickLib = require("node-sense-hat").Joystick;
const IMU = new imu.IMU()
const actions = require('./actions')

var options = {
  monitoring: false
}

JoystickLib.getJoystick().then(joystick => {
  joystick.on("release", direction => {
    actions[direction]()
  })
})

// function track() {
//
// }
//
// function monitor() {
//   setTimeout(() => {
//     if (options.monitoring == true) {
//       track().then(monitor)
//     }
//     monitor()
//   }, 10 0)
// }
//
// function analyzeChange(data) {
//   for (var n in data) {
//     change[n] = change[n] || {l: 0, d: 0}
//     change[n].d = Math.abs(Math.abs(change[n].l) - Math.abs(data[n]))
//
//   }
// }
//
// monitor()
