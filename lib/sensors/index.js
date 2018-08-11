const PiCamera = require('pi-camera')
const dev = require('point-device-sdk')
const delay = require('../delay')

const imgPath = `${ __dirname }/see.jpg`

const cam = new PiCamera({
  mode: 'photo',
  output: imgPath,
  width: 640,
  height: 480,
  nopreview: true,
})

class Sensors {
  constructor(interval) {
    this.rp = 0
    this._bound = []
    this.monitor = this.monitor.bind(this)
  }

  async get() {
    await cam.snap()

    return imgPath
  }

  async monitor() {
    if (!this.tracking) { return }

    let data = await this.get()

    for (var n in this._bound) {
      await this._bound[n](data)
    }

    this.rp++

    await delay(500)

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
