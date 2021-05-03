"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HomeScreen = (_ref) => {
  let {
    navigation
  } = _ref;
  return (0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.text,
      children: "Welcome User!"
    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.padding,
      children: "How to use?"
    }), (0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.style1,
      children: [(0, _jsxRuntime.jsx)(_reactNative.Button, {
        onPress: () => navigation.navigate('Database'),
        color: "green",
        title: "Access Database"
      }), (0, _jsxRuntime.jsx)(_reactNative.Button, {
        onPress: () => navigation.navigate('Upload'),
        color: "green",
        title: "Upload DICOM"
      })]
    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.padding,
      children: "1) ..."
    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.padding,
      children: "2) ..."
    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.padding,
      children: "3) ..."
    })]
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
  },
  style2: {
    margin: 20
  }
});

var _default = HomeScreen;
exports.default = _default;