const matrix = require('node-sense-hat').Leds
const shapes = require('./shapes')

function setShape(shape) {
  matrix.setPixels(shapes[shape])
}

function clearShape() {
  matrix.setPixels(shapes['blank'])
}

module.exports = {
  set: setShape,
  clear: clearShape
}
