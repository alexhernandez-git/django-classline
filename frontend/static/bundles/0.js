(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/react-player/lib/Preview.js":
/*!**************************************************!*\
  !*** ./node_modules/react-player/lib/Preview.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nfunction _getRequireWildcardCache() { if (typeof WeakMap !== \"function\") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { \"default\": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj[\"default\"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar ICON_SIZE = '64px';\n\nvar Preview = /*#__PURE__*/function (_Component) {\n  _inherits(Preview, _Component);\n\n  var _super = _createSuper(Preview);\n\n  function Preview() {\n    var _this;\n\n    _classCallCheck(this, Preview);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = _super.call.apply(_super, [this].concat(args));\n\n    _defineProperty(_assertThisInitialized(_this), \"mounted\", false);\n\n    _defineProperty(_assertThisInitialized(_this), \"state\", {\n      image: null\n    });\n\n    _defineProperty(_assertThisInitialized(_this), \"handleKeyPress\", function (e) {\n      if (e.key === 'Enter' || e.key === ' ') {\n        _this.props.onClick();\n      }\n    });\n\n    return _this;\n  }\n\n  _createClass(Preview, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      this.mounted = true;\n      this.fetchImage(this.props);\n    }\n  }, {\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(prevProps) {\n      var _this$props = this.props,\n          url = _this$props.url,\n          light = _this$props.light;\n\n      if (prevProps.url !== url || prevProps.light !== light) {\n        this.fetchImage(this.props);\n      }\n    }\n  }, {\n    key: \"componentWillUnmount\",\n    value: function componentWillUnmount() {\n      this.mounted = false;\n    }\n  }, {\n    key: \"fetchImage\",\n    value: function fetchImage(_ref) {\n      var _this2 = this;\n\n      var url = _ref.url,\n          light = _ref.light;\n\n      if (typeof light === 'string') {\n        this.setState({\n          image: light\n        });\n        return;\n      }\n\n      this.setState({\n        image: null\n      });\n      return window.fetch(\"https://noembed.com/embed?url=\".concat(url)).then(function (response) {\n        return response.json();\n      }).then(function (data) {\n        if (data.thumbnail_url && _this2.mounted) {\n          var image = data.thumbnail_url.replace('height=100', 'height=480');\n\n          _this2.setState({\n            image: image\n          });\n        }\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this$props2 = this.props,\n          onClick = _this$props2.onClick,\n          playIcon = _this$props2.playIcon;\n      var image = this.state.image;\n      var flexCenter = {\n        display: 'flex',\n        alignItems: 'center',\n        justifyContent: 'center'\n      };\n      var styles = {\n        preview: _objectSpread({\n          width: '100%',\n          height: '100%',\n          backgroundImage: image ? \"url(\".concat(image, \")\") : undefined,\n          backgroundSize: 'cover',\n          backgroundPosition: 'center',\n          cursor: 'pointer'\n        }, flexCenter),\n        shadow: _objectSpread({\n          background: 'radial-gradient(rgb(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 60%)',\n          borderRadius: ICON_SIZE,\n          width: ICON_SIZE,\n          height: ICON_SIZE\n        }, flexCenter),\n        playIcon: {\n          borderStyle: 'solid',\n          borderWidth: '16px 0 16px 26px',\n          borderColor: 'transparent transparent transparent white',\n          marginLeft: '7px'\n        }\n      };\n\n      var defaultPlayIcon = /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        style: styles.shadow,\n        className: \"react-player__shadow\"\n      }, /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        style: styles.playIcon,\n        className: \"react-player__play-icon\"\n      }));\n\n      return /*#__PURE__*/_react[\"default\"].createElement(\"div\", {\n        style: styles.preview,\n        className: \"react-player__preview\",\n        onClick: onClick,\n        tabIndex: 0,\n        onKeyPress: this.handleKeyPress\n      }, playIcon || defaultPlayIcon);\n    }\n  }]);\n\n  return Preview;\n}(_react.Component);\n\nexports[\"default\"] = Preview;\n\n//# sourceURL=webpack:///./node_modules/react-player/lib/Preview.js?");

/***/ })

}]);