const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')
const CT = require('color-thief')
const ct = new CT()

module.exports = async function (url) {
  let colors = ct.getPalette(url, 1)

  colors.forEach(color => {
    var num = (color.r * 100000) + (color.g * 1000) + color.b

    this.log.send({
  		event: 'color',
  		value: num
  	})
  })
}
