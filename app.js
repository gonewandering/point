const JoystickLib = require('node-sense-hat').Joystick;
const dev = require('point-device-sdk')
const motions = require('./motions')
const actions = require('./actions')

const setupJoystick = async function () {
  let joystick = await JoystickLib.getJoystick()
  joystick.on('release', dir => {
    motions[dir]()
  })
}

const init = async function () {
  await setupJoystick()
  dev.command.send('on')
  
  dev.command.on('*', cmd => {
    actions[cmd] && actions[cmd]()
  })

  dev.status.update('on')
}

init()
