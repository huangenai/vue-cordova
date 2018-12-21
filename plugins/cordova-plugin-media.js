exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof window.Media === 'undefined') {
      return cb(false)
    }

    Vue.cordova.media = window.Media;

    return cb(true)

  }, false)
}
