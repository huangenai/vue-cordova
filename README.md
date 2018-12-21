# vue-cordova
use cordova plugs in vue



# You may not need Vue-Cordova

Important Note: You **DO NOT** need Vue-Cordova to use Vue with Cordova or access Cordova plugins from Vue components. Vue-Cordova is a utility that makes the following plugins available in Vue components under ```Vue.cordova```:

```
cordova-plugin-baidumaplocation
cordova-plugin-camera
cordova-plugin-contacts
cordova-plugin-device
cordova-plugin-file-transfer
cordova-plugin-file
cordova-plugin-media
cordova-sqlite-storage
phonegap-plugin-barcodescanner
```

## important

```javascript
main.js
import VueCordova from './pluging/cordova/cordova.js';

Vue.use(VueCordova)


```


## Usage
``` javascript
  getPicture () {
      Vue.cordova.camera.getPicture((imageURI) => {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageURI;
      }, (message) => {
        alert('FAILED : ' + message)
      }, {
          //图片质量 0-100
          quality: 50,
          //返回值格式 Vue.cordova.camera.DestinationType {DATA_URL:"base64编码的字符串（会有内存问题）",FILE_URI:"返回file uri",NATIVE_URI:"返回 native uri"}
          destinationType: Vue.cordova.camera.DestinationType.DATA_URL,
          //来源 Vue.cordova.camera.PictureSourceType {PHOTOLIBRARY:"图片库"，CAMERA:"相机",SAVEDPHOTOALBUM:"仅从相机胶卷中选择图片"}
          sourceType: Vue.cordova.camera.PictureSourceType.PHOTOLIBRARY,
          //媒体类型 Vue.cordova.camera.MediaType {PICTURE:"图片",VIDEO:"视频",ALLMEDIA:"所有媒体类型"}
          mediaType: Vue.cordova.camera.MediaType.PICTURE
          //是否允许编辑 默认false
          //allowEdit：true, 安卓手机上无法预测效果尽量不使用
          //选择要使用的相机 默认背面：BACK 正面：FRONT
          //cameraDirection:Vue.cordova.camera.Direction.BACK
        })
    },
    getCurrentPosition () {
      Vue.cordova.baidulocation.getCurrentPosition(function (result) {
        alert(JSON.stringify(result, null, 4));
      }, (error) => {
        alert(error)
      });
    },
    device () {
      alert("cordova" + Vue.cordova.device.cordova + '\n' +
        "model" + Vue.cordova.device.model + '\n' +
        "platform" + Vue.cordova.device.platform + '\n' +
        "uuid" + Vue.cordova.device.uuid + '\n' +
        "version" + Vue.cordova.device.version + '\n' +
        "manufacturer" + Vue.cordova.device.manufacturer + '\n' +
        "isVirtual" + Vue.cordova.device.isVirtual + '\n' +
        "serial" + Vue.cordova.device.serial + '\n');
    },
    contacts () {
      var contactFileds = ["displayName", "name", "phoneNumbers", "emails", "address"];
      //filter制定为空或不指定返回所有联系人列表
      var options = { filter: "", multiple: true };
      Vue.cordova.contacts.find(contactFileds, (contacts) => {
        console.info(contacts);
        alert("Contact[" + 0 + "]: " + JSON.stringify(contacts[0]) + '<br />');
      }, (err) => {
        alert(JSON.stringify(err));
      }, options);
    },
    scan () {
      Vue.cordova.barcodeScanner.scan(
        (result) => {
          alert(
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        },
        (error) => {
          alert("failed: " + error);
        },
        {
          preferFrontCamera: false,
          showFlipCameraButton: true,
          showTorchButton: true,
          prompt: "我是提示", // 仅android
          resultDisplayDuration: 500,
          formats: "QR_CODE",
          orientation: "landscape",
          disableAnimations: true, // 仅iOS
          disableSuccessBeep: false
        }
      );
    },
    file (type) {
      //当前程序的目录  
      console.info(Vue.cordova.file.applicationDirectory);
      //程序的数据目录  
      console.info(Vue.cordova.file.applicationStorageDirectory);
      //程序的数据目录  
      console.info(Vue.cordova.file.dataDirectory);
      //程序的暂存目录  
      console.info(Vue.cordova.file.cacheDirectory);
      if (type == "android") {
        //Android扩展存储应用目录  
        console.info(Vue.cordova.file.externalApplicationStorageDirectory);
        //Android扩展存储数据目录  
        console.info(Vue.cordova.file.externalDataDirectory);
        //Android扩展存储缓存目录  
        console.info(Vue.cordova.file.externalCacheDirectory);
        //Android扩展根目录  
        console.info(Vue.cordova.file.tempDirectory);
      } else {
        //临时目录  
        console.info(Vue.cordova.file.tempDirectory);
        //云存储目录  
        console.info(Vue.cordova.file.syncedDataDirectory);
        //文档目录  
        console.info(Vue.cordova.file.documentsDirectory);
      }
    },
    download () {
      var fs = Vue.cordova.fileTransfer;
      var f = new fs()
      var fileURL = "";
      if (Vue.cordova.device.platform == "iOS") {
        fileURL = Vue.cordova.file.syncedDataDirectory + "localState/";
      } else {
        fileURL = Vue.cordova.file.externalDataDirectory;
      }
      f.download(encodeURI("http://www.hangge.com/blog/images/logo.png"), fileURL + "test.png", (entry) => {
        alert('下载成功,文件位置：' + entry.toURL());
        this.uploadurl = entry.toURL();
      }, (err) => {
        alert("下载失败！" + JSON.stringify(err));
      })
    },
    upload () {
      var fileURL = "";
      if (Vue.cordova.device.platform == "iOS") {
        fileURL = Vue.cordova.file.syncedDataDirectory + "localState/test.png";
      } else {
        fileURL = Vue.cordova.file.externalDataDirectory + "/test.png";
      }
      var uri = encodeURI("http://192.168.1.118:8091/im/api/chat/message/file?lang=cn_ZH&chatGroupId=13");
      var options = {
        fileKey: "file",
        fileName: "test.png",
        mimeType: "text/plain",
        headers: { 'X-Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NjE4ODIwMDkwNDAxIiwidXNlckNvbnRleHQiOiJ7XCJpZFwiOjc1LFwidXNlcm5hbWVcIjpcIjg2MTg4MjAwOTA0MDFcIixcInBsYXRmb3JtXCI6XCIxXCIsXCJpc1BvZGNhc3RcIjoxfSIsImlhdCI6MTU0MjYxMDY2MCwiZXhwIjoxNTQzMDQyNjYwfQ.vZw8XybnY0LuOeiSRsMyC36bYH3Vesjjl77qtzhfQnM_PujHTMCX9qlRYYXPeapDbY7CZHuM2ej-c8Gvpr5bnQ' }
      }
      var fs = Vue.cordova.fileTransfer;
      var f = new fs()
      f.upload(fileURL, uri, (r) => {
        alert("Code:" + r.responseCode + "\n"
          + "Response:" + r.response + "\n"
          + "Sent:" + r.bytesSent + "\n")
      }, (error) => {
        alert("An error has occurred: Code = " + error.code + "\n"
          + "upload error source = " + error.source + "\n"
          + "upload error target = " + error.target);
      }, options);

    },
    downloadTest () {
      var fs = Vue.cordova.fileTransfer;
      var f = new fs()
      var fileURL = "";
      if (Vue.cordova.device.platform == "iOS") {
        fileURL = Vue.cordova.file.syncedDataDirectory + "localState/";
      } else {
        fileURL = Vue.cordova.file.externalDataDirectory;
      }
      f.download(encodeURI("http://192.168.1.118:8091/im/api/chat/message/file/35"), fileURL + "35.png", (entry) => {
        alert('下载成功,文件位置：' + entry.toURL());
        this.uploadurl = entry.toURL();
      }, (err) => {
        alert("下载失败！" + JSON.stringify(err));
      })
    },
    initRecord () {
      var fileURL = "";
      if (Vue.cordova.device.platform == "iOS") {
        fileURL = "cdv" + Vue.cordova.file.documentsDirectory + "record.WAV";
      } else {
        fileURL = Vue.cordova.file.externalDataDirectory + "record.mp4";
      }
      this.media = new Media(fileURL, () => {
        alert('录音 success');
      }, function (err) {
        alert('初始化录音失败' + JSON.stringify(err));
      });
    },
    startRecord () {
      this.media.startRecord()
    },
    stopRecord () {
      alert('录音时长：' + this.media.getDuration());
      this.media.stopRecord();
    },
    playRecord () {
      var fileURL = "";
      if (Vue.cordova.device.platform == "iOS") {
        fileURL = "record.WAV";
      } else {
        fileURL = Vue.cordova.file.externalDataDirectory + "record.mp4";
      }
      var t = new Media("cdv" + Vue.cordova.file.documentsDirectory + fileURL, (data) => {
        console.log('加载成功,开始播放');

      }, (error) => {
        console.log('音频加载失败' + JSON.stringify(error));
      });

      //开始播放
      t.play();

      setTimeout(function () {
        t.pause();
      }, 10000);
    }


```
