const cv = require('opencv4nodejs')
const dev = require('point-device-sdk')
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT)
const age = require('../classer/cv/age')
const gender = require('../classer/cv/gender')

function resizeImage(img, rect) {
  let out = img.getRegion(rect)
  out = out.copy(out)

  let xp = Math.floor(rect.width > rect.height ? 0 : (rect.height - rect.width) / 2)
  let yp = Math.floor(rect.height > rect.width ? 0 : (rect.width - rect.height) / 2)

  let padded = out.copyMakeBorder(yp, yp, xp, xp, 0, new cv.Vec(255, 255, 255))

  return padded
}

module.exports = async function (url) {
  var out = []

  try {
    const img = await cv.imreadAsync(url)
    const grayImg = await img.bgrToGrayAsync()
    const { objects, numDetections } = await classifier.detectMultiScaleGpu(grayImg)

    for (var n in objects) {
      let nimg = resizeImage(img, objects[n])
      let a = await age(nimg)
      let g = await gender(nimg)

      out.push({
        age: a,
        gender: g
      })
    }

    console.log(out)
    // await dev.log.send({event: 'people', value: objects.length })
  } catch (err) {
    console.error(err)
  }
}
