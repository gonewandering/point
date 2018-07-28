const mid = require('node-machine-id')
const sh = require('shorthash')

module.exports = {
  gcp: {
    id: 'taro-194821'
  },
  scheme: {
    type: 'interval'
  },
  log: {
    url: 'https://us-east1-taro-194821.cloudfunctions.net/point'
  },
  device: {
    id: sh.unique(mid.machineIdSync())
  },
  colors: [
    [0, 0, 0],
    [255, 0, 0],
    [0, 100, 255],
    [100, 0, 255],
    [255, 100, 0]
  ]
}
