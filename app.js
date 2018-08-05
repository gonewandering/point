const JoystickLib = require('node-sense-hat').Joystick;
const dev = require('point-device-sdk')
const motions = require('./motions')
const actions = require('./actions')

const init = async function () {
  let joystick = await JoystickLib.getJoystick()

  joystick.on('release', dir => {
    motions[dir]()
  })

  actions['on']()

  dev.command.on('*', (cmd, data) => {
    actions[cmd] && actions[cmd](data)
  })
}

init()
