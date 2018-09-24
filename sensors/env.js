const Device = require('point-device-sdk')
const imu = require('node-sense-hat').Imu
const IMU = new imu.IMU()

class EnvSensor extends Device.Sensor {
  async get() {
    await Device.delay(1000)
    return await new Promise((suc, cat) => {
      IMU.getValue((err, data) => {
        if (err) { return cat(err) }
        return suc(data)
      })
    })
  }
}

module.exports = EnvSensor
