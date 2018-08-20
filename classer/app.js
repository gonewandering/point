/const cv = require('opencv4nodejs')
const _ = require('underscore')

const coco300 = require('./cv/coco')
const gender = require('./cv/gender')
const age = require('./cv/age')

function resizeImage(img, tl, br) {

  //
  // Step 1: Resize image...
  //

  let x = tl ? Math.floor(tl.x < 0 ? 0 : tl.x) : 0
  let y = tl ? Math.floor(br.y < 0 ? 0 : br.y) : 0

  let width = tl ? Math.floor(br.x - tl.x) : img.cols
  let height = tl ? Math.floor(tl.y - br.y) : img.rows

  width = width + x > img.cols ? img.cols - x : width
  height = height + y > img.rows ? img.rows - y : height

  let rect = new cv.Rect(x, y, width, height)
  let out = img.getRegion(rect)
  let mat = new cv.Mat()

  out = out.copy(out)

  //
  // Step 2: Pad image to be square
  //

  let xp = Math.floor(width > height ? 0 : (height - width) / 2)
  let yp = Math.floor(height > width ? 0 : (width - height) / 2)

  let padded = out.copyMakeBorder(yp, yp, xp, xp, 0, new cv.Vec(255, 255, 255))

  return padded
}

module.exports = async function run(url) {
  let results = []
  let img = cv.imread(url)

  img = await resizeImage(img)

  let obj = await coco300(img, {threshold: .3})

  for (var n in obj) {

    let out = {
      meta: obj[n]
    }

    if (obj[n].className == 'person') {
      let nimg = resizeImage(img, obj[n].topLeft, obj[n].bottomRight)

      let proms = [age(nimg), gender(nimg)]
      let res = await Promise.all(proms)

      out.age = res[0][0]
      out.gender = res[1][0]

      results.push(out)
    }
  }

  return results
}
