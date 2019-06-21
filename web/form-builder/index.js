"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormBuilder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FormBuilder, _React$Component);

  function FormBuilder() {
    _classCallCheck(this, FormBuilder);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormBuilder).apply(this, arguments));
  }

  _createClass(FormBuilder, [{
    key: "getFormMeta",
    value: function getFormMeta() {
      var meta = this.props.meta;
      return meta.elements ? meta : {
        elements: [meta]
      };
    }
  }, {
    key: "pickProps",
    value: function pickProps(source, props) {
      return props.reduce(function (prop, val) {
        return val in source && (prop[val] = source[val]), prop;
      }, {});
    }
  }, {
    key: "renderElement",
    value: function renderElement(elem) {
      var _this$props = this.props,
          defaultLayout = _this$props.defaultLayout,
          disabled = _this$props.disabled;
      var meta = this.getFormMeta();
      var label = elem.tooltip ? _react["default"].createElement("span", null, elem.label, _react["default"].createElement(_antd.Tooltip, {
        title: elem.tooltip
      }, ' ', _react["default"].createElement(_antd.Icon, {
        type: "question-circle-o"
      }))) : elem.label;

      var formItemProps = _objectSpread({
        key: elem.key,
        colon: meta.colon
      }, meta.layout || (elem.label ? defaultLayout : null), {
        label: label
      }, this.pickProps(elem, ['help', 'extra', 'labelCol', 'wrapperCol', 'colon', 'hasFeedback', 'validateStatus']), elem.itemProps);

      if (elem.render) {
        return elem.render.call(this, {
          formItemProps: formItemProps,
          elem: elem,
          disabled: disabled
        });
      }

      var rules = elem.rules || [];

      if (elem.required) {
        rules = [].concat(_toConsumableArray(rules), [{
          required: true,
          message: "".concat(elem.message, " || ").concat(elem.label || elem.key, " is required.")
        }]);
      }

      var fieldProps = _objectSpread({}, this.pickProps(elem, ['getValueFromEvent', 'initialValue', 'normalize', 'trigger', 'valuePropName', 'validateTrigger', 'validateFirst']), {
        rules: rules
      }, elem.fieldProps);

      var elemProps = _objectSpread({}, this.pickProps(elem, ['placeholder', 'type', 'className', 'class']), elem.elemProps || {}, {
        disabled: elem.disabled || (elem.elemProps || {}).disabled || this.props.disabled
      });

      var getFieldDecorator = this.props.form.getFieldDecorator;
      return _react["default"].createElement(_antd.Form.Item, formItemProps, getFieldDecorator(elem.id || elem.key, fieldProps)(_react["default"].createElement(elem.elem, itemProps, elem.children || null)));
    }
  }, {
    key: "renderLayout",
    value: function renderLayout(elems) {
      var meta = this.props.meta;
      var _meta$columns = meta.columns,
          columns = _meta$columns === void 0 ? 1 : _meta$columns,
          _meta$gutter = meta.gutter,
          gutter = _meta$gutter === void 0 ? 0 : _meta$gutter;
      if (columns === 1) return elems;
      var rows = [];
      var colspan = 24 / columns;

      for (var i = 0; i < elems.length; i += columns) {
        var cols = [];

        for (var j = 0; j < columns; j++) {
          cols.push(_react["default"].createElement(_antd.Col, {
            key: j,
            span: colspan.toString()
          }, "$", elems[i + j]));
        }

        rows.push(_react["default"].createElement(_antd.Row, {
          key: i,
          gutter: gutter
        }, cols));
      }

      return rows;
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderLayout(this.getFormMeta().elements.map(this.renderElement));
    }
  }]);

  return FormBuilder;
}(_react["default"].Component);

exports.FormBuilder = FormBuilder;

_defineProperty(FormBuilder, "propTypes", {
  form: _propTypes["default"].object.isRequired,
  meta: _propTypes["default"].object.isRequired,
  disabled: _propTypes["default"].bool
});

_defineProperty(FormBuilder, "defaultProps", {
  disabled: false,
  one: false,
  defaultLayout: {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  }
});