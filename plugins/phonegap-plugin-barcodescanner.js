exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof cordova.plugins.barcodeScanner === 'undefined') {
      return cb(false)
    }

    Vue.cordova.barcodeScanner = cordova.plugins.barcodeScanner;

    return cb(true)

  }, false)
}
