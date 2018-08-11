const dev = require('point-device-sdk')

dev.command.send('track', {
  mid: '721ddee5'
})

dev.log.on({
  mid: '721ddee5'
}, (msg) => { console.log(msg) })

setTimeout(() => {
  dev.command.send('pause', {
    mid: '721ddee5'
  })
}, 5000)
