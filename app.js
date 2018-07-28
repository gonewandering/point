const JoystickLib = require('node-sense-hat').Joystick;
const actions = require('./actions')

JoystickLib.getJoystick().then(joystick => {
  actions.start()

  joystick.on('release', direction => {
    actions[direction] && actions[direction]()
  })
})
