"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _WebContext = require("../context/WebContext");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { Extypo } from '@expo/vector-icons';
const LoginScreen = (_ref) => {
  let {
    navigation
  } = _ref;
  const {
    state,
    setUserName,
    setPassword
  } = (0, _react.useContext)(_WebContext.Context);

  const onSubmit = async () => {
    const reqOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password
      })
    };
    state.username = '';
    state.password = '';

    try {
      let resp = await fetch('/login', reqOption).then(data => data.json());
      return resp.success ? navigation.navigate('Home') : () => {};
    } catch (error) {
      console.log("Error: ".concat(error));
    }
  };

  return (0, _jsxRuntime.jsxs)(_reactNative.View, {
    children: [(0, _jsxRuntime.jsx)(_reactNative.Text, {
      children: "Username"
    }), (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      placeholder: "Enter username",
      autoCapitalize: "none",
      autoCorrect: false,
      value: state.username,
      onChangeText: setUserName
    }), (0, _jsxRuntime.jsx)(_reactNative.Text, {
      children: "Password"
    }), (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      secureTextEntry: state.password,
      placeholder: "Enter password",
      autoCapitalize: "none",
      autoCorrect: false,
      value: state.password,
      onChangeText: setPassword
    }), (0, _jsxRuntime.jsx)(_reactNative.Button, {
      color: "green",
      title: "Login",
      onPress: () => onSubmit()
    }), (0, _jsxRuntime.jsx)(_reactNative.Button, {
      color: "blue",
      title: "register now",
      onPress: () => navigation.navigate('Register')
    }), (0, _jsxRuntime.jsxs)("label", {
      children: [(0, _jsxRuntime.jsx)("input", {
        type: "checkbox",
        name: "remember",
        onChange: () => {}
      }), " Remember me"]
    })]
  });
};

const styles = _reactNative.StyleSheet.create({
  text: {
    fontSize: 30
  }
});

var _default = LoginScreen;
exports.default = _default;