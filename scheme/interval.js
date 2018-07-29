module.exports (conf) {
  let log = conf.log

  return conf.sensors.track(data => {
    log.read({type: 'z-acc', value: data.accel.x }),
    log.read({type: 'y-acc', value: data.accel.y }),
    log.read({type: 'x-acc', value: data.accel.z }),
    log.read({type: 'z-angle', value: data.gyro.x }),
    log.read({type: 'y-angle', value: data.gyro.y }),
    log.read({type: 'x-angle', value: data.gyro.z }),
    log.read({type: 'temperature', value: data.temperature }),
    log.read({type: 'pressure', value: data.pressure })
  })
}
