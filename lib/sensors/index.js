const dev = require('point-device-sdk')
const imu = require('node-sense-hat').Imu
const delay = require('../delay')
const IMU = new imu.IMU()

class Sensors {
  constructor(interval) {
    this.rp = 0
    this._bound = []
    this.monitor()
  }

  get() {
    return new Promise((suc, cat) => {
      IMU.getValue((err, data) => {
        if (err) { return cat(err) }
        return suc(data)
      })
    })
  }

  async monitor() {
    if (!this.tracking) { return }

    let data = await this.get()

    for (var n in this._bound) {
      await this._bound[n](data)
    }

    this.rp++

    await delay(dev.config.delay || 100)
    this.monitor()
  }

  on(func) {
    this._bound.push(func)
  }

  track() {
    this.tracking = true
    this.monitor.bind(this)()
  }

  pause() {
    this.tracking = false
    return true
  }
}

module.exports = new Sensors()
