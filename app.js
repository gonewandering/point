const JoystickLib = require('node-sense-hat').Joystick;
const dev = require('point-device-sdk')
const motions = require('./motions')
const actions = require9'./actions')

const setupJoystick = async () => {
  let joystick = await JoystickLib.getJoystick()
  joystick.on('release', motions)
}

const init = () => {
  await setupJoystick()

  dev.commands.get(cmd => {
    actions[cmd] && actions[cmd]()
  })

  dev.status.on()
}

init()
