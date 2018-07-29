const actions = require('./actions')
const motions = {}

motions.up = actions.track
motions.down = actions.pause
motions.left = actions.restart
motions.right = actions.update

module.exports = motions
