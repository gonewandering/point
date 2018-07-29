const config = require('../../config')
const PubSub = require(`@google-cloud/pubsub`)

const pubsub = new PubSub({
  projectId: config.gcp.id
})

function listenForMessages(queue) {
  const subscription = pubsub.subscription(queue)

  let messageCount = 0

  const messageHandler = message => {
    let data = message.data
    console.log(data)
    message.ack();
  }

  return subscription
}

module.exports = listenForMessages
