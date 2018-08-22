module.exports = function resizeImage(img, rect) {
  let out = img.getRegion(rect)
  out = out.copy(out)

  let xp = Math.floor(rect.width > rect.height ? 0 : (rect.height - rect.width) / 2)
  let yp = Math.floor(rect.height > rect.width ? 0 : (rect.width - rect.height) / 2)

  let padded = out.copyMakeBorder(yp, yp, xp, xp, 0, new cv.Vec(255, 255, 255))

  return padded
}
