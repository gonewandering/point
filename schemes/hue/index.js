const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')
const CT = require('color-thief')
const ct = new CT()
const getColors = require('get-image-colors')
 
module.exports = async function (url) {
 // let colors = ct.getPalette(url, 1)
 let colors = await getColors(url)
 let color = colors[0].hsl()
 
 this.log.send({
  event: 'hue',
  value: color[0]
 })
}
