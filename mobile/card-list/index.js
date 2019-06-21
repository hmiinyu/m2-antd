"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardList = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _m2Core = require("m2-core");

var _antdMobile = require("antd-mobile");

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CardList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CardList, _React$Component);

  function CardList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CardList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CardList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "fields", {
      dataList: [],
      dataSource: new _antdMobile.ListView.DataSource({
        rowHasChanged: function rowHasChanged(r1, r2) {
          return r1 !== r2;
        }
      })
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      dataSource: _this.fields.dataSource,
      refreshing: false,
      loading: true,
      hasMore: true
    });

    _defineProperty(_assertThisInitialized(_this), "renderList", function (res) {
      var params = _this.props.params;
      var dataSource = _this.state.dataSource;
      var dataList = _this.fields.dataList;
      var items = res.data || [];

      _this.setState({
        dataSource: dataSource.cloneWithRows(dataList.concat(items)),
        refreshing: false,
        loading: false,
        hasMore: items.length < params.paggeSize
      }, function () {
        return params.page++;
      });
    });

    return _this;
  }

  _createClass(CardList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _m2Core.DataBus.on(this.props.eventType, this.renderList);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _m2Core.DataBus.off(this.props.eventType, this.renderList);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          renderRow = _this$props.renderRow,
          loadData = _this$props.loadData,
          params = _this$props.params,
          scrollSettings = _this$props.scrollSettings,
          threshold = _this$props.threshold,
          loadingText = _this$props.loadingText,
          completedText = _this$props.completedText;
      var _this$state = this.state,
          dataSource = _this$state.dataSource,
          refreshing = _this$state.refreshing,
          loading = _this$state.loading,
          hasMore = _this$state.hasMore;
      return _react["default"].createElement(_antdMobile.ListView, _extends({
        className: "card-list-container",
        dataSource: dataSource,
        renderRow: renderRow,
        initialListSize: params.pageSize,
        pageSize: params.pageSize,
        useBodyScroll: true
      }, scrollSettings, {
        onEndReachedThreshold: threshold,
        onEndReached: function onEndReached() {
          if (loading && !hasMore) return false;

          _this2.setState({
            loading: true
          });

          loadData(params);
        },
        pullToRefresh: _react["default"].createElement(_antdMobile.PullToRefresh, {
          refreshing: refreshing,
          onRefresh: function onRefresh() {
            if (!_this2.__manually_refresh) {
              _this2.setState({
                refreshing: true
              });
            } else {
              _this2.__manually_refresh = false;
            }

            loadData(_objectSpread({}, params, {
              page: 1
            }));
          }
        }),
        renderFooter: function renderFooter() {
          return _react["default"].createElement("p", null, hasMore ? loadingText : completedText);
        }
      }));
    }
  }]);

  return CardList;
}(_react["default"].Component);

exports.CardList = CardList;

_defineProperty(CardList, "propTypes", {
  loadData: _propTypes["default"].func.isRequired,
  params: _propTypes["default"].object.isRequired,
  renderRow: _propTypes["default"].func.isRequired,
  eventType: _propTypes["default"].string.isRequired,
  scrollSettings: _propTypes["default"].object,
  loadingText: _propTypes["default"].string,
  completedText: _propTypes["default"].string,
  threshold: _propTypes["default"].number
});

_defineProperty(CardList, "defaultProps", {
  scrollSettings: {
    onScroll: function onScroll() {},
    scrollerOptions: {
      scrollbars: true
    },
    scrollRenderAheadDistance: 200,
    scrollEventThrottle: 20
  },
  threshold: 20,
  loadingText: '努力加载中...',
  completedText: '加载完毕'
});