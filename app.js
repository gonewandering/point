const dev = require('point-device-sdk')
const actions = require('./actions')

const init = async function () {
  actions['on']()

  dev.command.on('*', (cmd, data) => {
    actions[cmd] && actions[cmd](data)
  })
}

init()
