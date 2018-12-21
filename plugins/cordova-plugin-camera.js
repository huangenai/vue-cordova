exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof navigator.camera === 'undefined') {
      return cb(false)
    }

    Vue.cordova.camera = navigator.camera

    return cb(true)

  }, false)
}
