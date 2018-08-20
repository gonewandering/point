const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')

const genderModelPath = './models/age_gender'

const prototxt = path.resolve(genderModelPath, 'deploy_age.prototxt');
const modelFile = path.resolve(genderModelPath, 'age_net.caffemodel');

// initialize ssdcoco model from prototxt and modelFile
const net = cv.readNetFromCaffe(prototxt, modelFile);

module.exports = async (img) => {
  const white = new cv.Vec(255, 255, 255)
  const imgResized = img.resize(227, 227, img.rows / img.cols, img.cols / img.rows, 0)

  const inputBlob = cv.blobFromImage(imgResized);
  net.setInput(inputBlob)

  let outputBlob = net.forward()

  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[0], outputBlob.sizes[1])
  const results = Array(outputBlob.rows).fill(0)
    .map((res, i) => {
      const ages = {
        '0-2': outputBlob.at(i, 0),
        '4-6': outputBlob.at(i, 1),
        '8-13': outputBlob.at(i, 2),
        '15-20': outputBlob.at(i, 3),
        '25-32': outputBlob.at(i, 4),
        '38-43': outputBlob.at(i, 5),
        '48-53': outputBlob.at(i, 6),
        '60-': outputBlob.at(i, 7)
      }

      // const topLeft = new cv.Point(
      //   outputBlob.at(i, 3) * img.cols,
      //   outputBlob.at(i, 6) * img.rows
      // );
      //
      // const bottomRight = new cv.Point(
      //   outputBlob.at(i, 5) * img.cols,
      //   outputBlob.at(i, 4) * img.rows
      // );
      //
      // if (confidence > .3) {
      //   img.drawRectangle(topLeft, bottomRight, new cv.Vec(0, 255, 255))
      //   console.log(className, confidence)
      // }
      //
      // cv.imwriteAsync('./wing.jpg', img)

      return ages
    })

    return results
}
