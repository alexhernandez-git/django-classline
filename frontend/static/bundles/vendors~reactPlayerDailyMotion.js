(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~reactPlayerDailyMotion"],{

/***/ "./node_modules/react-player/lib/players/DailyMotion.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-player/lib/players/DailyMotion.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _utils = __webpack_require__(/*! ../utils */ \"./node_modules/react-player/lib/utils.js\");\n\nvar _patterns = __webpack_require__(/*! ../patterns */ \"./node_modules/react-player/lib/patterns.js\");\n\nfunction _getRequireWildcardCache() { if (typeof WeakMap !== \"function\") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { \"default\": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj[\"default\"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(n); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar SDK_URL = 'https://api.dmcdn.net/all.js';\nvar SDK_GLOBAL = 'DM';\nvar SDK_GLOBAL_READY = 'dmAsyncInit';\n\nvar DailyMotion = /*#__PURE__*/function (_Component) {\n  _inherits(DailyMotion, _Component);\n\n  var _super = _createSuper(DailyMotion);\n\n  function DailyMotion() {\n    var _this;\n\n    _classCallCheck(this, DailyMotion);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super.call.apply(_super, [this].concat(args));\n\n    _defineProperty(_assertThisInitialized(_this), \"callPlayer\", _utils.callPlayer);\n\n    _defineProperty(_assertThisInitialized(_this), \"onDurationChange\", function () {\n      var duration = _this.getDuration();\n\n      _this.props.onDuration(duration);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"mute\", function () {\n      _this.callPlayer('setMuted', true);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"unmute\", function () {\n      _this.callPlayer('setMuted', false);\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"ref\", function (container) {\n      _this.container = container;\n    });\n\n    return _this;\n  }\n\n  _createClass(DailyMotion, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.props.onMount && this.props.onMount(this);\n    }\n  }, {\n    key: \"load\",\n    value: function load(url) {\n      var _this2 = this;\n\n      var _this$props = this.props,\n          controls = _this$props.controls,\n          config = _this$props.config,\n          onError = _this$props.onError,\n          playing = _this$props.playing;\n\n      var _url$match = url.match(_patterns.MATCH_URL_DAILYMOTION),\n          _url$match2 = _slicedToArray(_url$match, 2),\n          id = _url$match2[1];\n\n      if (this.player) {\n        this.player.load(id, {\n          start: (0, _utils.parseStartTime)(url),\n          autoplay: playing\n        });\n        return;\n      }\n\n      (0, _utils.getSDK)(SDK_URL, SDK_GLOBAL, SDK_GLOBAL_READY, function (DM) {\n        return DM.player;\n      }).then(function (DM) {\n        if (!_this2.container) return;\n        var Player = DM.player;\n        _this2.player = new Player(_this2.container, {\n          width: '100%',\n          height: '100%',\n          video: id,\n          params: _objectSpread({\n            controls: controls,\n            autoplay: _this2.props.playing,\n            mute: _this2.props.muted,\n            start: (0, _utils.parseStartTime)(url),\n            origin: window.location.origin\n          }, config.params),\n          events: {\n            apiready: _this2.props.onReady,\n            seeked: function seeked() {\n              return _this2.props.onSeek(_this2.player.currentTime);\n            },\n            video_end: _this2.props.onEnded,\n            durationchange: _this2.onDurationChange,\n            pause: _this2.props.onPause,\n            playing: _this2.props.onPlay,\n            waiting: _this2.props.onBuffer,\n            error: function error(event) {\n              return onError(event);\n            }\n          }\n        });\n      }, onError);\n    }\n  }, {\n    key: \"play\",\n    value: function play() {\n      this.callPlayer('play');\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this.callPlayer('pause');\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {// Nothing to do\n    }\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(seconds) {\n      this.callPlayer('seek', seconds);\n    }\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(fraction) {\n      this.callPlayer('setVolume', fraction);\n    }\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      return this.player.duration || null;\n    }\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      return this.player.currentTime;\n    }\n  }, {\n    key: \"getSecondsLoaded\",\n    value: function getSecondsLoaded() {\n      return this.player.bufferedTime;\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var display = this.props.display;\n      var style = {\n        width: '100%',\n        height: '100%',\n        display: display\n      };\n      return /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        style: style\n      }, /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        ref: this.ref\n      }));\n    }\n  }]);\n\n  return DailyMotion;\n}(_react.Component);\n\nexports[\"default\"] = DailyMotion;\n\n_defineProperty(DailyMotion, \"displayName\", 'DailyMotion');\n\n_defineProperty(DailyMotion, \"loopOnEnded\", true);\n\n//# sourceURL=webpack:///./node_modules/react-player/lib/players/DailyMotion.js?");

/***/ })

}]);