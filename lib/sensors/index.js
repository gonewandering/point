const exec = require('../hlp/exec')
const dev = require('point-device-sdk')
const delay = require('../delay')

const imgPath = `${ __dirname }/see.jpg`

class Sensors {
  constructor(interval) {
    this.rp = 0
    this._bound = []
    this.monitor = this.monitor.bind(this)
  }

  async get() {
    await exec(`raspistill -w 1024 -h 768 -q 70 -o ${ imgPath } -t 1`)
    return imgPath
  }

  async monitor() {
    if (!this.tracking) { return }

    let data = await this.get()

    for (var n in this._bound) {
      await this._bound[n](data)
    }

    this.rp++
    delay(20000)
    this.monitor()
  }

  on(func) {
    this._bound.push(func)
  }

  track() {
    this.tracking = true
    this.monitor()
  }

  pause() {
    this._bound = []
    this.tracking = false
    return true
  }
}

module.exports = new Sensors()
