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
  send: function () {
    let O = [0,0,0]
    let X = [0,255,100]
    let Z = [0,255,255]

    return [
      O, O, O, O, O, O, O, O,
      O, O, O, Z, O, O, O, O,
      O, O, O, X, Z, O, O, O,
      O, O, O, X, X, Z, O, O,
      O, O, O, X, X, Z, O, O,
      O, O, O, X, Z, O, O, O,
      O, O, O, Z, O, O, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  circle: function () {
    let O = [0,0,0]
    let X = [255, 100, 0]
    let Y = [0, 100, 255]

    return [
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, Y, Y, O, O, O,
      O, O, Y, X, X, Y, O, O,
      O, O, Y, X, X, Y, O, O,
      O, O, O, Y, Y, O, O, O,
      O, O, O, O, O, O, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  update: function () {
    let O = [0,0,0]
    let X = [0,0,255]
    return [
      O, O, O, O, O, O, O, O,
      O, X, O, O, O, X, O, O,
      X, X, O, O, O, X, X, O,
      O, X, O, O, X, X, X, X,
      O, X, O, O, X, X, X, X,
      X, X, X, O, O, X, X, O,
      O, O, O, O, O, X, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  update2: function () {
    let O = [0,0,0]
    let X = [0,0,255]
    return [
      O, O, O, O, O, O, O, O,
      O, X, O, O, O, X, O, O,
      X, O, X, O, O, X, X, O,
      O, O, X, O, X, X, X, X,
      O, X, O, O, X, X, X, X,
      X, X, X, O, O, X, X, O,
      O, O, O, O, O, X, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  update3: function () {
    let O = [0,0,0]
    let X = [0,0,255]
    return [
      O, O, O, O, O, O, O, O,
      X, X, O, O, O, X, O, O,
      O, O, X, O, O, X, X, O,
      X, X, O, O, X, X, X, X,
      O, O, X, O, X, X, X, X,
      X, X, O, O, O, X, X, O,
      O, O, O, O, O, X, O, O,
      O, O, O, O, O, O, O, O
    ]
  },
  cross: function () {
    let X = [255,0,0]
    let O = [0,0,0]
    let Z = [100,0,0]

    return [
    	O, O, O, O, O, O, O, O,
    	O, O, O, O, O, O, O, O,
    	O, O, X, Z, O, X, O, O,
    	O, O, X, Z, O, X, O, O,
    	O, O, X, Z, O, X, O, O,
    	O, O, X, Z, O, X, O, O,
    	O, O, O, O, O, O, O, O,
    	O, O, O, O, O, O, O, O,
    ]
  },
  arrow: function () {
    let O = [0,0,0]
    let X = [0,30,100]
    let Z = [0,60,160]

    return [
      O, O, O, O, O, O, O, O,
      O, O, O, Z, O, O, O, O,
      O, O, O, X, Z, O, O, O,
      O, O, O, X, X, Z, O, O,
      O, O, O, X, X, Z, O, O,
      O, O, O, X, Z, O, O, O,
      O, O, O, Z, O, O, O, O,
      O, O, O, O, O, O, O, O
    ]
  }
}
