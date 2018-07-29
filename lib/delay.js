module.exports = function (ms) {
  return new Promise((succ, cat) => {
    return setTimeout(succ, ms)
  })
}
