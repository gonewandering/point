const detector = require('../classer/app')
const dev = require('point-device-sdk')

module.exports = async function (url) {
  let results = await detector(url)

  for (var n in results) {
    let r = results[n]

    let dims = [{
      label: 'object',
      name: r.className
    }]

    let metrics = []

    if (r.className == 'person') {
      let age = null
      let gender = null

      for (var n in r.age) {
        if(r.age[n] > .5) {
          age = n
        }
      }

      if (r.gender.male > .9 || r.gender.female > .9) {
        gender = r.gender.male > .9 ? 'male' : 'female'
      }

      age && dims.push({
        label: 'age',
        name: age
      })

      gender && dims.push({
        label: 'gender',
        name: gender
      })
    }

    await dev.log.send({
      event: 'see',
      value: r.confidence,
      dimension: dims
    })
  }
}
