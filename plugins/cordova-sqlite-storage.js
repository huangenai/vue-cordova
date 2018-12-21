exports.install = function (Vue, options, cb) {
  document.addEventListener('deviceready', () => {

    if (typeof window.sqlitePlugin === 'undefined') {
      return cb(false)
    }

    Vue.cordova.sqlite = window.sqlitePlugin;

    return cb(true)

  }, false)
}
