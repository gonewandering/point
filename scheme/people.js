const cv = require('opencv4nodejs')
const dev = require('point-device-sdk')
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT)

module.exports = async function (url) {
  try {
    const img = await cv.imreadAsync(url)
    const grayImg = await img.bgrToGrayAsync()
    const { objects, numDetections } = await classifier.detectMultiScaleGpu(grayImg)

    console.log(objects, numDetections)
    await dev.log.send({event: 'z-angle', value: res.gyro.x })
  } catch (err) {
    console.error(err)
  }
}
