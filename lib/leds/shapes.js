module.exports = {
  blank: function () {
    let O = [0,0,0]

    return [
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  update: function () {
    let O = [0,0,0]
    let X = [0,0,255]
    return [
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, X, O, O,
      O, O, O, O, O, X, X, O,
      X, X, X, X, X, X, X, X,
      X, X, X, X, X, X, X, X,
      O, O, O, O, O, X, X, O,
      O, O, O, O, O, X, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  cross: function () {
    let X = [255,0,0]
    let O = [0,0,0]

    return [
    	X, O, O, O, O, O, O, X,
    	O, X, O, O, O, O, X, O,
    	O, O, X, O, O, X, O, O,
    	O, O, O, X, X, O, O, O,
    	O, O, O, X, X, O, O, O,
    	O, O, X, O, O, X, O, O,
    	O, X, O, O, O, O, X, O,
    	X, O, O, O, O, O, O, X,
    ]
  },
  arrow: function () {
    let X = [0,255,0]
    let O = [0,0,0]

    return [
      O, O, X, X, X, O, O, O,
      O, O, O, O, X, X, O, O,
      O, O, O, O, O, X, X, O,
      O, O, O, O, O, O, X, X,
      O, O, O, O, O, O, X, X,
      O, O, O, O, O, X, X, O,
      O, O, O, O, X, X, O, O,
      O, O, X, X, X, O, O, O,
    ]
  }
}
