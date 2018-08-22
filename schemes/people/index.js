const cv = require('opencv4nodejs')
const dev = require('point-device-sdk')
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT)
const resizeImage = require('./resizeImage')
const age = require('../classer/cv/age')
const gender = require('../classer/cv/gender')

async function detector (url) {
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

    return out
  } catch (err) {
    console.error(err)
  }
}

module.exports = async function (url) {
  let results = await detector(url)

  for (var n in results) {
    let r = results[n]

    let dims = []

    let age = null
    let gender = null

    for (var n in r.age) {
      if(r.age[n] > .5) {
        age = n
      }
    }

    if (r.gender.male > .75 || r.gender.female > .75) {
      gender = r.gender.male > .75 ? 'male' : 'female'
    }

    age && dims.push({
      label: 'age',
      name: age
    })

    gender && dims.push({
      label: 'gender',
      name: gender
    })

    await dev.log.send({
      event: 'person',
      value: 1,
      dimension: dims
    })
  }
}
