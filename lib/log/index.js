const request = require('request-promise-native')
const mid = require('node-machine-id')
const _ = require('underscore')
const config = require('../../config')

class Log {
  constructor() {
    this.base = {
      device: {
        id: mid.machineIdSync()
      },
      action: 'read'
    }
  }

  send(eve) {
    let struc = {
      valueNumeric: eve.value,
      type: eve.label
    }

    let out = _.extend({}, this.base, struc)

    return request({
      url: config.log.url,
      method: 'post',
      body: out,
      json: true
    }).catch((err) => { console.log(err) })
  }
}

module.exports = Log
