module.exports = async function (data) {
 return await this.log.send({
  event: 'temperature',
  value: data.temperature
 })
}
