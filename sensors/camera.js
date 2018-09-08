const Device = require('point-device-sdk')

class CameraSensor extends Device.Sensor {
  constructor() {
    super()
    this.path = `${ __dirname }/see.jpg`
  }

  async get() {
    await Device.exec(`raspistill -w 1024 -h 768 -q 70 -o ${ this.path } -t 1`)
    return this.path
  }
}

module.exports = CameraSensor
