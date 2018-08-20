const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')

const classNames = require('../models/coco300/classNames')
const ssdcocoModelPath = './models/coco300'

const prototxt = path.resolve(ssdcocoModelPath, 'deploy.prototxt');
const modelFile = path.resolve(ssdcocoModelPath, 'VGG_coco_SSD_300x300_iter_400000.caffemodel');

const net = cv.readNetFromCaffe(prototxt, modelFile);

module.exports = async (img, opts) => {
  const threshold = opts && opts.threshold ? opts.threshold : 0;
  const white = new cv.Vec(255, 255, 255)
  const imgResized = img.resize(300, 300)

  // network accepts blobs as input
  const inputBlob = cv.blobFromImage(imgResized);
  net.setInput(inputBlob)

  let outputBlob = net.forward()
  outputBlob = outputBlob.flattenFloat(outputBlob.sizes[2], outputBlob.sizes[3])

  let results = Array(outputBlob.rows).fill(0)
    .map((res, i) => {
      const className = classNames[outputBlob.at(i, 1)];
      const confidence = outputBlob.at(i, 2)

      const topLeft = new cv.Point(
        outputBlob.at(i, 3) * img.cols,
        outputBlob.at(i, 6) * img.rows
      );

      const bottomRight = new cv.Point(
        outputBlob.at(i, 5) * img.cols,
        outputBlob.at(i, 4) * img.rows
      );

      // if (confidence > .3) {
      //   img.drawRectangle(topLeft, bottomRight, new cv.Vec(0, 255, 255))
      //   console.log(className, confidence)
      // }

      return ({
        className,
        confidence,
        topLeft,
        bottomRight
      })
    })

    results = results.filter(d => {
      return d.confidence > threshold
    })

    return results
}
