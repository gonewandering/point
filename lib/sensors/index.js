const imu = require('node-sense-hat').Imu
const IMU = new imu.IMU()

const Sensors = new Class {
  constructor(interval) {
    this.interval = interval || 1000
    this.last = {}
  }

  get() {
    return new Promise((suc, cat) => {
      IMU.getValue((err, data) => {
        if (err) { return cat(err) }
        return suc(data)
      })
    })
  }

  monitor() {
    setTimeout(() => {
      this.get.bind(this).then(data => {
        this.funcs.forEach(func => {
          func(data)
          this.monitor()
        })
      })
    }, this.interval)
  }

  on(func) {
    this.funcs.push(func)
  }
}

module.exports = Sensors
