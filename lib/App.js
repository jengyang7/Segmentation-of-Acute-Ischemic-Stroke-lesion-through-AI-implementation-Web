"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNavigation = require("react-navigation");

var _reactNavigationStack = require("react-navigation-stack");

var _LoginScreen = _interopRequireDefault(require("./screens/LoginScreen"));

var _HomeScreen = _interopRequireDefault(require("./screens/HomeScreen"));

var _DatabaseScreen = _interopRequireDefault(require("./screens/DatabaseScreen"));

var _UploadScreen = _interopRequireDefault(require("./screens/UploadScreen"));

var _RegisterScreen = _interopRequireDefault(require("./screens/RegisterScreen"));

var _logo = _interopRequireDefault(require("./logo.svg"));

var _WebContext = require("./context/WebContext");

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("custom-jsx-library/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const navigator = (0, _reactNavigationStack.createStackNavigator)({
  Login: _LoginScreen.default,
  Register: _RegisterScreen.default,
  Home: _HomeScreen.default,
  Database: _DatabaseScreen.default,
  Upload: _UploadScreen.default
}, {
  initialRouteName: 'Login',
  defaultNavigationOptions: {
    title: 'Welcome to React'
  }
}); // export default App;

const App = (0, _reactNavigation.createAppContainer)(navigator);

var _default = () => {
  return (// Wrap into WebContext's Provider
    (0, _jsxRuntime.jsx)(_WebContext.Provider, {
      children: (0, _jsxRuntime.jsx)(App, {})
    })
  );
};

exports.default = _default;