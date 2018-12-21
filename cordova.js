const pluginsList = [
  'cordova-plugin-camera',
  'cordova-plugin-device',
  'cordova-plugin-contacts',
  'cordova-plugin-baidumaplocation',
  'phonegap-plugin-barcodescanner',
  'cordova-plugin-file-transfer',
  'cordova-plugin-file',
  'cordova-plugin-media',
  'cordova-sqlite-storage'
]

exports.install = (Vue, options) => {

  Vue.cordova = Vue.cordova || {
    deviceready: false,
    plugins: []
  }

  Vue.cordova.on = (eventName, cb) => {
    document.addEventListener(eventName, cb, false)
  }

  document.addEventListener('deviceready', () => {
    Vue.cordova.deviceready = true
  }, false)

  pluginsList.forEach(pluginName => {
    let plugin = require('./plugins/' + pluginName)
    plugin.install(Vue, options, pluginLoaded => {
      if (pluginLoaded) {
        Vue.cordova.plugins.push(pluginName)
      }
      if (Vue.config.debug) {
        console.log('[VueCordova]', pluginName, '→', pluginLoaded ? 'loaded' : 'not loaded')
      }
    })
  })

}
