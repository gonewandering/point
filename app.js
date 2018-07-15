const JoystickLib = require('node-sense-hat').Joystick;
const actions = require('./actions')

actions.start()

JoystickLib.getJoystick().then(joystick => {
  joystick.on('release', direction => {
    actions[direction] && actions[direction]()
  })
})
