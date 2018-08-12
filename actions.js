const dev = require('point-device-sdk')
const sensors = require('./lib/sensors')
const leds = require('./lib/leds')
const exec = require('./lib/hlp/exec')
const process = require('process')
const config = require('./config')
const schemes = require('./schemes')

const actions = {}

actions.on = async function () {
  await.dev.config.init()

  let conn = await dev.network.connected(5000)
  leds.status('on', true)

  if (conn) {
    leds.status('network', true)
  }

  leds.status('ready', true)
  leds.set('ready')
  await dev.status.update('on')
}

actions.restart = async function () {
  leds.status('ready', false)
  leds.status('network', false)
  leds.status('on', false)

  await dev.status.update('restarting')
  await exec('sudo reboot')
}

actions.off = async function () {
  await dev.status.update('off')
  await exec('sudo shutdown -h now')
}

actions.config = async function (data) {
  await dev.status.update('updating')
  await dev.config.set(data)
  await dev.status.update('ready')
}

actions.track = async function () {
  let activeSchemes = dev.config.get('schemes')
  leds.status('tracking', true)
  leds.set('tracking')
  dev.status.update('tracking')

  sensors.track()

  sensors.on(async res => {
    for(var s in activeSchemes) {
      let scheme = activeSchemes[s]

      if (schemes[scheme.name]) {
        await schemes[scheme.name](res, scheme)
      }
    }
  })
}

actions.pause = function () {
  leds.status('tracking', false)
  leds.set('ready')

  dev.status.update('ready')
  sensors.pause()
}

actions.update = async function () {
  leds.set('update1')

  await dev.status.update('updating')
  await exec(`cd ${ __dirname }`)
  await exec('git pull origin master')
  await leds.set('update2')
  await exec('npm install')
  await leds.set('update3')
  await dev.status.update('update-complete')

  await actions.restart()
}

module.exports = actions
