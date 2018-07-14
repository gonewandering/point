const JoystickLib = require('node-sense-hat').Joystick;
const actions = require('./actions')

JoystickLib.getJoystick().then(joystick => {
  joystick.on('release', direction => {
    actions[direction]()
  })
})
