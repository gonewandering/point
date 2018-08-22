const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')

const modelPath = `${ __dirname }/models`
const prototxt = path.resolve(modelPath, 'deploy_gender.prototxt');
const modelFile = path.resolve(modelPath, 'gender_net.caffemodel');
const net = cv.readNetFromCaffe(prototxt, modelFile);

module.exports = async (img) => {
  const imgResized = img.resize(227, 227)
  const inputBlob = cv.blobFromImage(imgResized)
  net.setInput(inputBlob)

  let outputBlob = net.forward()
  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[0], outputBlob.sizes[1])

  const results = Array(outputBlob.rows).fill(0)

  return results.map((res, i) => {
    const female = outputBlob.at(i, 0);
    const male = outputBlob.at(i, 1);

    return ({
      female,
      male
    })
  })
}
