const request = require('request-promise-native')
const _ = require('underscore')
const config = require('../../config')

class Log {
  constructor(queue) {
    this.base = {
      device: config.device
    }
  }

  send(queue, eve) {
    let out = _.extend({}, this.base, eve)
    let api = config.log.url + '?q=' + queue

    return request({
      url: api,
      method: 'post',
      body: out,
      json: true
    }).catch((err) => { console.log(err) })
  }

  read(sensor, value) {
    return this.send('point', {
      action: 'read',
      type: sensor,
      valueNumeric: value
    })
  }

  reading(sensor, value) {
    return this.read(sensor, value)
  }

  device(type) {
    return this.send('point-device', {
      action: 'device',
      type: type
    })
  }

  on() { return this.device('on') }
  off() { return this.device('off') }
  start() { return this.device('start') }
  pause() { return this.device('stop') }
  update() { return this.device('update') }
  restart() { return this.device('restart') }
}

module.exports = Log
