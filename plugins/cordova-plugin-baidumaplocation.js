exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof baidumap_location === 'undefined') {
      return cb(false)
    }

    Vue.cordova.baidulocation = baidumap_location;

    return cb(true)

  }, false)
}
