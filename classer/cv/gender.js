const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')

const genderModelPath = './models/age_gender'

const prototxt = path.resolve(genderModelPath, 'deploy_gender.prototxt');
const modelFile = path.resolve(genderModelPath, 'gender_net.caffemodel');

// initialize ssdcoco model from prototxt and modelFile
const net = cv.readNetFromCaffe(prototxt, modelFile);

module.exports = async (img) => {
  const white = new cv.Vec(255, 255, 255)
  const imgResized = img.resize(227, 227)

  // network accepts blobs as input
  const inputBlob = cv.blobFromImage(imgResized);
  net.setInput(inputBlob)

  let outputBlob = net.forward()

  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[0], outputBlob.sizes[1])
  const results = Array(outputBlob.rows).fill(0)
    .map((res, i) => {
      const female = outputBlob.at(i, 0);
      const male = outputBlob.at(i, 1);

      return ({
        female,
        male
      })
    })

    return results
}
