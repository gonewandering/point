const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')

const modelPath = `${ __dirname }/models`
const prototxt = path.resolve(modelPath, 'deploy_age.prototxt')
const modelFile = path.resolve(modelPath, 'age_net.caffemodel')
const net = cv.readNetFromCaffe(prototxt, modelFile)

module.exports = async (img) => {
  const imgResized = img.resize(227, 227)
  const inputBlob = cv.blobFromImage(imgResized)

  net.setInput(inputBlob)

  let outputBlob = net.forward()
  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[0], outputBlob.sizes[1])

  const results = Array(outputBlob.rows).fill(0)

  return results.map((res, i) => {
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

    return ages
  })
}
