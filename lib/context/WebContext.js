"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.Context = void 0;

var _createWebContext = _interopRequireDefault(require("./createWebContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const webReducer = (state, action) => {
  switch (action.type) {
    case 'set_username':
      return _objectSpread(_objectSpread({}, state), {}, {
        username: action.username
      });

    case 'set_password':
      return _objectSpread(_objectSpread({}, state), {}, {
        password: action.password
      });

    case 'set_register_username':
      return _objectSpread(_objectSpread({}, state), {}, {
        registerUsername: action.registerUsername
      });

    case 'set_register_password':
      return _objectSpread(_objectSpread({}, state), {}, {
        registerPassword: action.registerPassword
      });

    default:
      return state;
  }
};

const setRegisterUserName = dispatch => {
  return registerUsername => {
    dispatch({
      type: 'set_register_username',
      registerUsername: registerUsername
    });
  };
};

const setRegisterPassword = dispatch => {
  return registerPassword => {
    dispatch({
      type: 'set_register_password',
      registerPassword: registerPassword
    });
  };
};

const setUserName = dispatch => {
  return username => {
    dispatch({
      type: 'set_username',
      username: username
    });
  };
};

const setPassword = dispatch => {
  return password => {
    dispatch({
      type: 'set_password',
      password: password
    });
  };
};

const {
  Context,
  Provider
} = (0, _createWebContext.default)(webReducer, {
  setUserName,
  setPassword,
  setRegisterUserName,
  setRegisterPassword
}, {
  username: '',
  password: '',
  registerUsername: '',
  registerPassword: ''
});
exports.Provider = Provider;
exports.Context = Context;