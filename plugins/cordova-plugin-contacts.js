exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof navigator.contacts === 'undefined') {
      return cb(false)
    }

    Vue.cordova.contacts = navigator.contacts

    return cb(true)

  }, false)
}
