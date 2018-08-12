const dev = require('point-device-sdk')

module.exports = function (res, set, eve, val) {
  let freq = Math.round((set.freq || dev.config.get('freq') || 1000) / 100)

  if (sensors.rp % freq == 0) {
    dev.log.send({event: eve, value: res[val] })
  }
}
