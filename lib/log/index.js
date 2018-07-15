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
      type: 'read'
    }
  }

  send(eve) {
    eve = _.extend({}, this.base, eve)

    return request({
      url: config.log.url,
      body: eve,
      json: true
    })
  }
}

module.exports = Log
