"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antdMobile = require("antd-mobile");

require("index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabBar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TabBar, _React$Component);

  function TabBar() {
    _classCallCheck(this, TabBar);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabBar).apply(this, arguments));
  }

  _createClass(TabBar, [{
    key: "renderIcon",
    value: function renderIcon(url) {
      return _react["default"].createElement("img", {
        style: {
          width: 22,
          height: 22
        },
        src: url,
        alt: ""
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          items = _this$props.items,
          colors = _this$props.colors;
      return _react["default"].createElement("div", {
        className: "tab-bar-container"
      }, items.length ? _react["default"].createElement(_antdMobile.TabBar, colors, items.map(function (item) {
        return _react["default"].createElement(_antdMobile.TabBar.Item, {
          key: item.key,
          title: item.title,
          icon: _this.renderIcon(item.icon),
          selectedIcon: _this.renderIcon(item.selectedIcon),
          selected: location.hash === item.url,
          onPress: function onPress() {
            return location.hash = item.url;
          }
        });
      })) : '');
    }
  }]);

  return TabBar;
}(_react["default"].Component);

exports.TabBar = TabBar;

_defineProperty(TabBar, "propTypes", {
  items: _propTypes["default"].array.isRequired,
  colors: _propTypes["default"].object
});

_defineProperty(TabBar, "defaultProps", {
  colors: {
    unselectedTintColor: '#949494',
    tintColor: '#33a4f4',
    barTintColor: '#fff'
  }
});