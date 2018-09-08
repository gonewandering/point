const cv = require('opencv4nodejs')
const path = require('path')
const fs = require('fs')

const dev = require('point-device-sdk')
const classNames = require('/home/pi/point-device-see/schemes/cars/models/coco300_classNames')
const ssdcocoModelPath = '/home/pi/point-device-see/schemes/cars/models'

const prototxt = path.resolve(ssdcocoModelPath, 'coco300.prototext');
const modelFile = path.resolve(ssdcocoModelPath, 'coco300.caffemodel');

const net = cv.readNetFromCaffe(prototxt, modelFile);

const detector = async (img, opts) => {
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

module.exports = async function (url) { 
	let img = cv.imread(url)
	
	let results = await detector(img)
        
	results = results.filter(d => { 
		if (d.className == 'car' && d.confidence > .05) { 
			return true
		} else {
			return false
		}
	})

	dev.log.send({
		event: 'cars',
		value: results.length
	})

	console.log('cars', results.length)
}
