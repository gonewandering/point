const Device = require('point-device-sdk')

const device = new Device({
  sensor: require('./sensors/camera'),
  schemes: require('./schemes')
})

device.actions.on()
