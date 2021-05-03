"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DatabaseScreen = () => {
  return (0, _jsxRuntime.jsx)(_reactNative.View, {
    children: (0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.text,
      children: "Your Data"
    })
  });
};

const styles = _reactNative.StyleSheet.create({
  text: {
    fontSize: 30
  },
  padding: {
    paddingTop: 20
  },
  style1: {
    position: 'absolute',
    right: 0,
    bottom: 50
  }
});

var _default = DatabaseScreen;
exports.default = _default;