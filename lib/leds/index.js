const matrix = require('node-sense-hat').Leds
const shapes = require('./shapes')
const config = require('../../config')

function mapPixels(matrix) {
  return matrix.map(d => {
    return config.colors[d]
  })
}

function setShape(shape) {
  let rgb = mapPixels(shapes[shape])
  return matrix.setPixels(rgb)
}

function clearShape() {
  return setShape('blank')
}

module.exports = {
  set: setShape,
  clear: clearShape
}
