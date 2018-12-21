exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof window.FileTransfer === 'undefined') {
      return cb(false)
    }

    Vue.cordova.fileTransfer = window.FileTransfer

    return cb(true)

  }, false)
}
