module.exports = async function (data) {
 return this.log.send({
  event: 'humidity',
  value: data.humidity
 })
}
