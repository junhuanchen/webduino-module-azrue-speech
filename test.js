
/*
* audioJS
* author: Evandro Leopoldino Gonçalves <evandrolgoncalves@gmail.com>
* https://github.com/evandrolg
* License: MIT
*/
(function (window) {
  'use strict';

  var ajax = function (params) {
    var httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener('load', function () {
      params.success(httpRequest.response);
    }, false);

    try {
      httpRequest.open('GET', params.file, true);
      httpRequest.responseType = 'arraybuffer';
      httpRequest.send();
    } catch (e) {
      window.console.log(e);
    }
  };

  var CallbackManager = function () {
    return {
      register: function (obj) {
        this.callback = obj.callback;
        this.context = obj.context;
      },

      execute: function () {
        if (this.callback) {
          this.callback.call(this.context);
        }
      }
    };
  };

  var AudioJS = function (params) {
    if (!params) {
      throw 'You need to pass a value as parameter!';
    }

    this._cachedVariabes(params);
    this._load();
  };

  AudioJS.prototype = {
    _validateFormat: function () {
      // var regex = /\.(mp3|opus|ogg|wav|m4a|weba)$/;
      // var isValid = regex.test(this.file);
      // console.log(isValid, this.file);
      // if (!isValid) {
      //   throw 'The format of the audio file is invalid!';
      // }
    },

    _createInstance: function () {
      var AudioContext = window.AudioContext || window.webkitAudioContext || null;
      var hasSupport = AudioContext;

      if (!hasSupport) {
        throw 'Your browser does not support API AudioContext!';
      }

      this.audioContext = new AudioContext();
    },

    _cachedVariabes: function (params) {
      this._createInstance();

      var isString = typeof params === 'string';

      if (isString) {
        this.file = params;
      } else {
        this.file = params.file;
        this.autoPlay = params.autoPlay;
        this.loop = params.loop || false;
        this.volume = params.volume || 1;
      }

      this._validateFormat();

      this.callbackManager = new CallbackManager();
    },

    _load: function () {
      var that = this;

      ajax({
        file: this.file,
        success: function (response) {
          that._decodeAudioData.call(that, response);
          Registry.musicLoaded = true;
          updateLoader();
        }
      });
    },

    _decodeAudioData: function (response) {
      var that = this;
      var audioContext = this.audioContext;

      audioContext.decodeAudioData(response,
        function (buffer) {
          that.source = audioContext.createBufferSource();
          that.source.buffer = buffer;
          that.source.connect(audioContext.destination);
          // that.source.gain.value = that.volume;
          that.source.loop = that.loop;
          that.buffer = buffer;

          if (that.autoPlay || that.shouldPlay) {
            that.callbackManager.register({
              callback: that._play,
              context: that
            });

            that.callbackManager.execute();
          }
        },

        function () {
          throw 'Decoding the audio buffer failed!';
        }
      );
    },

    _play: function () {
      this.source.start(0);
      this.isStarted = true;
    },

    play: function () {
      this.callbackManager.register({
        callback: this._play,
        context: this
      });

      // if we want to play the sound again after stop //
      if (this.buffer && this.shouldPlay) {
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.connect(this.audioContext.destination);
        this.source.gain.value = this.volume;
        this.source.loop = this.loop;
        this.source.start(0);
        this.isStarted = true;
      }

      this.shouldPlay = true;
    },

    stop: function () {
      if (this.isStarted) {
        this.source.stop(0);
        this.isStarted = false;
      }
    }
  };

  window.audioJS = function (params) {
    return new AudioJS(params);
  };
}(this));

var audio = window.audioJS({
  file: 'https://club.istemedu.com/wxapi/tts?text=ts&lang=zh-HK'
});

audio.play();

window.setTimeout(function () {
  audio.stop();
}, 4000);

// var xhr = $.ajax({
//   url: "https://club.istemedu.com/wxapi/tts",
//   type: "get", //send it through get method
//   data: {
//     text: 123,
//     lang: 'zh-HK'
//   },
//   success: function (response) {
//     console.log(typeof response);
//   },
//   error: function (xhr) {
//     console.log(xhr);
//   }
// });

// // window.URL.createObjectURL(blob);

// var blob = new Blob([response], {
//   type: 'audio/wav'
// });
// console.log(blob);
