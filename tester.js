const dev = require('point-device-sdk')

dev.status.on('*', {mid: '721ddee5'}, status => {
  console.log(`Changing status to ${status}`)
})

dev.log.on({mid: '721ddee5'}, log => {
  if (log.data.event == 'temperature') {
    console.log(log.data.value)
  }
})

dev.command.send('pause', {mid: '721ddee5'})
