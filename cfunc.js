// Imports the Google Cloud client library
const PubSub = require('@google-cloud/pubsub')

const projectId = 'taro-194821'
const topicId = 'point'

const pubsub = new PubSub({
  projectId: projectId,
})

function pubish(req, res) {
  const data = JSON.stringify(req.body || req.query)
  const dataBuffer = Buffer.from(data)

  await pubsub.topic(topicId).publisher().publish(dataBuffer)
  res.json(true)
}
