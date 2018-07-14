const imu = require('node-sense-hat').Imu
const IMU = new imu.IMU()

class Sensors {
  constructor(interval) {
    this.interval = interval || 1000
    this.last = {}
    this.func = function (data) {}
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
    var func = this.func
    setTimeout(() => {
      this.get.bind(this)().then(data => {
	func && func(data)
	this.monitor()
      })
    }, this.interval)
  }

  on(func) {
    this.func = func
  }

  track(func) { 
    this.func = func
  }
}

module.exports = Sensors
