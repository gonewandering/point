const imu = require('node-sense-hat').Imu
const IMU = new imu.IMU()

class Sensors {
  constructor(interval) {
    this.interval = interval || 1000
    this.last = {}
    this.func = function (data) {}
  }

  delay(ms) {
    return new Promise((succ, cat) => {
      return succ()
    }, ms)
  }

  get() {
    return new Promise((suc, cat) => {
      IMU.getValue((err, data) => {
        if (err) { return cat(err) }
        return suc(data)
      })
    })
  }

  monitor(func) {
    if (!this.tracking) { return }

    this.delay(this.config.freq)
      .then(this.get)
      .then(data => {
        func && func(data)
        this.monitor(func)
      })
  }

  track(func) {
    return this.monitor(func)
  }

  pause() {
    this.tracking = false
    return true
  }
}

module.exports = Sensors
