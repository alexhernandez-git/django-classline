(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["reactPlayerSoundCloud"],{

/***/ "./node_modules/react-player/lib/players/SoundCloud.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-player/lib/players/SoundCloud.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/react-player/lib/utils.js\");\n\nfunction _getRequireWildcardCache() { if (typeof WeakMap !== \"function\") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { \"default\": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj[\"default\"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar SDK_URL = 'https://w.soundcloud.com/player/api.js';\nvar SDK_GLOBAL = 'SC';\n\nvar SoundCloud = /*#__PURE__*/function (_Component) {\n  _inherits(SoundCloud, _Component);\n\n  var _super = _createSuper(SoundCloud);\n\n  function SoundCloud() {\n    var _this;\n\n    _classCallCheck(this, SoundCloud);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super.call.apply(_super, [this].concat(args));\n\n    _defineProperty(_assertThisInitialized(_this), \"callPlayer\", _utils.callPlayer);\n\n    _defineProperty(_assertThisInitialized(_this), \"duration\", null);\n\n    _defineProperty(_assertThisInitialized(_this), \"currentTime\", null);\n\n    _defineProperty(_assertThisInitialized(_this), \"fractionLoaded\", null);\n\n    _defineProperty(_assertThisInitialized(_this), \"mute\", function () {\n      _this.setVolume(0);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"unmute\", function () {\n      if (_this.props.volume !== null) {\n        _this.setVolume(_this.props.volume);\n      }\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"ref\", function (iframe) {\n      _this.iframe = iframe;\n    });\n\n    return _this;\n  }\n\n  _createClass(SoundCloud, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.props.onMount && this.props.onMount(this);\n    }\n  }, {\n    key: \"load\",\n    value: function load(url, isReady) {\n      var _this2 = this;\n\n      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL).then(function (SC) {\n        if (!_this2.iframe) return;\n        var _SC$Widget$Events = SC.Widget.Events,\n            PLAY = _SC$Widget$Events.PLAY,\n            PLAY_PROGRESS = _SC$Widget$Events.PLAY_PROGRESS,\n            PAUSE = _SC$Widget$Events.PAUSE,\n            FINISH = _SC$Widget$Events.FINISH,\n            ERROR = _SC$Widget$Events.ERROR;\n\n        if (!isReady) {\n          _this2.player = SC.Widget(_this2.iframe);\n\n          _this2.player.bind(PLAY, _this2.props.onPlay);\n\n          _this2.player.bind(PAUSE, function () {\n            var remaining = _this2.duration - _this2.currentTime;\n\n            if (remaining < 0.05) {\n              // Prevent onPause firing right before onEnded\n              return;\n            }\n\n            _this2.props.onPause();\n          });\n\n          _this2.player.bind(PLAY_PROGRESS, function (e) {\n            _this2.currentTime = e.currentPosition / 1000;\n            _this2.fractionLoaded = e.loadedProgress;\n          });\n\n          _this2.player.bind(FINISH, function () {\n            return _this2.props.onEnded();\n          });\n\n          _this2.player.bind(ERROR, function (e) {\n            return _this2.props.onError(e);\n          });\n        }\n\n        _this2.player.load(url, _objectSpread({}, _this2.props.config.options, {\n          callback: function callback() {\n            _this2.player.getDuration(function (duration) {\n              _this2.duration = duration / 1000;\n\n              _this2.props.onReady();\n            });\n          }\n        }));\n      });\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this.callPlayer('play');\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this.callPlayer('pause');\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {// Nothing to do\n    }\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(seconds) {\n      this.callPlayer('seekTo', seconds * 1000);\n    }\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(fraction) {\n      this.callPlayer('setVolume', fraction * 100);\n    }\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      return this.duration;\n    }\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      return this.currentTime;\n    }\n  }, {\n    key: \"getSecondsLoaded\",\n    value: function getSecondsLoaded() {\n      return this.fractionLoaded * this.duration;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var display = this.props.display;\n      var style = {\n        width: '100%',\n        height: '100%',\n        display: display\n      };\n      return /*#__PURE__*/_react[\"default\"].createElement(\"iframe\", {\n        ref: this.ref,\n        src: \"https://w.soundcloud.com/player/?url=\".concat(encodeURIComponent(this.props.url)),\n        style: style,\n        frameBorder: 0,\n        allow: \"autoplay\"\n      });\n    }\n  }]);\n\n  return SoundCloud;\n}(_react.Component);\n\nexports[\"default\"] = SoundCloud;\n\n_defineProperty(SoundCloud, \"displayName\", 'SoundCloud');\n\n_defineProperty(SoundCloud, \"loopOnEnded\", true);\n\n//# sourceURL=webpack:///./node_modules/react-player/lib/players/SoundCloud.js?");

/***/ })

}]);